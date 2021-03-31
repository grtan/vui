<template>
  <div v-show="list.length > 1" class="vui-video__quality-selector">
    {{ selected && selected.label }}
    <div ref="list" class="vui-video__quality-selector-list">
      <div
        v-for="({ label, selected }, index) in list"
        :key="index"
        :class="[
          'vui-video__quality-selector-item',
          {
            'vui-video__quality-selector-item--selected': selected
          }
        ]"
        @click="select(index)"
      >
        {{ label }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { setInterval, clearInterval } from '@/utils/index'
import { SOURCES_CHANGED, SOURCE_SWITCHED } from '../../event'
import toast from '../../../toast/index'

@Component({
  name: 'VuiVideoQualitySelector'
})
export default class VComponent extends Vue {
  private sources: {
    src: string
    type?: string
    label?: string
    selected: boolean
    defaultQuality?: number
    qualities?: {
      id: string
      label: string
      selected: boolean
    }[]
  }[] = JSON.parse(JSON.stringify(this.$options.player!.currentSources()))

  private intervalId!: number

  // source或者quality列表
  get list() {
    if (this.sources.length === 1 && (this.sources[0].qualities?.length ?? 0) > 1) {
      return [
        ...this.sources[0].qualities!,
        {
          id: 'auto',
          label: '自动',
          // 已经明确选择了某个清晰度时就不智能选择
          selected: !this.sources[0].qualities!.find(item => item.selected)
        }
      ]
    }

    return this.sources
  }

  // 当前选中的source或者quality
  get selected() {
    return (this.list as any).find(({ selected }: { selected: boolean }) => selected)
  }

  @Watch('sources')
  onSourcesChange() {
    const player = this.$options.player!
    const paused = player.paused()

    // 如果此时正在切换清晰度，需要清除轮询
    clearInterval(this.intervalId)
    // 切换播放源
    player.src(JSON.parse(JSON.stringify(this.sources.find(item => item.selected))))
    player[paused ? 'pause' : 'play']()
    player.currentTime(0)
  }

  @Watch('selected')
  onSelectedChange() {
    this.$options.player?.trigger(SOURCE_SWITCHED, this.selected)
  }

  // 切换清晰度
  select(index: number) {
    if (this.list[index].selected) {
      return
    }

    const player = this.$options.player!

    // 多个sources的场景
    if (this.list === this.sources) {
      const paused = player.paused()
      const currentTime = player.currentTime()

      this.sources.forEach((item, idx) => {
        item.selected = idx === index
      })

      /**
       * 删除对应的qualities
       * 因为每次执行player.src()时会重新触发addqualitylevel事件
       */
      this.$delete(this.sources[index], 'qualities')
      // 切换source
      player.src(JSON.parse(JSON.stringify(this.sources[index])))
      player[paused ? 'pause' : 'play']()
      // 必须等loadedmetadata触发后再设置currentTime，否则无效
      player.one('loadedmetadata', () => {
        // 不知道为啥，必须要延迟下才生效，否则会从0开始
        setTimeout(() => {
          player.currentTime(currentTime)
        }, 50)
      })

      return
    }

    // 自适应多码率hls流场景
    const qualities = this.list as NonNullable<VComponent['sources'][0]['qualities']>
    const qualityLevels = player.qualityLevels()
    const targetQualityLevel = Array.prototype.slice.call(qualityLevels).find(item => item.id === qualities[index].id)
    const prevQualityId = qualities.find(item => item.selected)!.id
    const prevTime = performance.now()

    toast(`正在切换为${qualities[index].label}清晰度，请稍等...`, {
      className: 'vui-video__quality-selector-toast',
      target: player.el()
    })

    // 自适应多码率hls流，自动选择清晰度时需要允许所有分辨率
    for (let i = 0; i < qualityLevels.length; i++) {
      qualityLevels[i].enabled = !targetQualityLevel || qualityLevels[i].id === targetQualityLevel.id
    }

    // 轮询获取清晰度切换完成的时机
    clearInterval(this.intervalId)
    this.intervalId = setInterval(() => {
      /**
       * 根据视频分辨率来判断，还未完成切换
       * 这里有个问题，如果有些qualityLevel分辨率一样，但bitrate不一样时，会误判，不过总体没啥影响
       * player.videoWidth/Height()获取的实际尺寸与qualityLevel中标明的会有几px误差
       */
      if (
        targetQualityLevel &&
        (Math.abs(player.videoWidth() - targetQualityLevel.width) > 10 ||
          Math.abs(player.videoHeight() - targetQualityLevel.height) > 10)
      ) {
        // 超时
        if (performance.now() - prevTime > 15000) {
          // 切换失败
          clearInterval(this.intervalId)
          toast('切换失败', {
            className: 'vui-video__quality-selector-toast',
            target: player.el()
          })

          // 使用之前的分辨率
          for (let i = 0; i < qualityLevels.length; i++) {
            qualityLevels[i].enabled = prevQualityId === 'auto' || qualityLevels[i].id === prevQualityId
          }
        }

        return
      }

      // 切换完成
      clearInterval(this.intervalId)
      toast(`已切换到${qualities[index].label}清晰度`, {
        className: 'vui-video__quality-selector-toast',
        target: player.el(),
        duration: 500000
      })
      qualities.forEach((quality, idx) => {
        quality.selected = idx === index
      })
    }, 300)
  }

  mounted() {
    const player = this.$options.player!
    const qualityLevels = player.qualityLevels()

    // 将列表元素移动位置
    player.el().appendChild(this.$refs.list as Element)

    // 外部传入的sources有变化
    player.on(SOURCES_CHANGED, (event, sources: VComponent['sources']) => {
      // 将sources转换成数组
      if (typeof sources === 'string') {
        sources = [
          {
            src: sources,
            selected: false
          }
        ]
      } else if (!(sources instanceof Array)) {
        sources = [sources]
      }

      // 深拷贝，防止影响外部数据
      sources = JSON.parse(JSON.stringify(sources))

      const currentSource = player.currentSource() || {}
      // 播放器自动选择的视频源
      const playerSelectedIndex = sources.findIndex(({ src, type }) => {
        return src === currentSource.src && type === currentSource.type
      })
      // 用户选择的视频源
      const userSelectedIndex = sources.findIndex(({ selected }) => {
        return selected
      })
      // 优先使用用户选择的source
      const selectedIndex =
        userSelectedIndex !== -1 ? userSelectedIndex : playerSelectedIndex !== -1 ? playerSelectedIndex : 0

      sources.forEach((source, index) => {
        source.selected = index === selectedIndex
      })
      this.sources = sources
    })

    // 自适应hls流新增分辨率
    qualityLevels.on('addqualitylevel', ({ qualityLevel }: { qualityLevel: any }) => {
      const source = this.sources.find(({ selected }) => selected)!
      const quality = Math.min(qualityLevel.width, qualityLevel.height)

      /**
       * 如果当前选择的source指定了默认分辨率，则要判断刚加进来的qualityLevel是否就是默认分辨率
       * 否则需要允许所有加入的qualityLevel，以便进行智能选择
       */
      qualityLevel.enabled = !source.defaultQuality || quality === source.defaultQuality

      if (!source.qualities) {
        this.$set(source, 'qualities', [])
      }

      if (source.qualities!.find(item => item.id === qualityLevel.id)) {
        return
      }

      source.qualities!.push({
        id: qualityLevel.id,
        label: `${quality}P`,
        selected: quality === source.defaultQuality
      })
    })

    // qualityLevels.on('change', () => {
    //   console.log('change', qualityLevels, qualityLevels[qualityLevels.selectedIndex].height)
    // })
  }

  beforeDestroy() {
    clearInterval(this.intervalId)
    // 清除挂载到其他位置到dom
    ;(this.$refs.list as Element).parentElement?.removeChild(this.$refs.list as Element)
  }
}
</script>
