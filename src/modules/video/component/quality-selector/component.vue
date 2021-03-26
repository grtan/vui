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
import { SOURCES_CHANGED } from '../../event'
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
    qualities?: {
      id: string
      label: string
      selected: boolean
    }[]
  }[] = JSON.parse(JSON.stringify(this.$options.player!.currentSources()))

  private intervalId!: number

  // source或者quality列表
  get list() {
    if (this.sources.length === 1 && this.sources[0].qualities?.length) {
      return this.sources[0].qualities
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
    const qualityLevels = player.qualityLevels()

    // 如果此时正在切换清晰度，需要清除轮询
    clearInterval(this.intervalId)
    // 只有初始化sources时监听一次，用来选中初始清晰度
    qualityLevels.off('change', this.onQualityChange)
    qualityLevels.one('change', this.onQualityChange)
    // 切换播放源
    player.src(JSON.parse(JSON.stringify(this.sources.find(item => item.selected))))
    player[paused ? 'pause' : 'play']()
    player.currentTime(0)
  }

  // 监控多码率自适应流清晰度切换
  onQualityChange() {
    const player = this.$options.player!
    const qualityLevels = player.qualityLevels()
    const source = this.sources.find(({ selected }) => selected)!

    if (!source.qualities) {
      return
    }

    source.qualities.forEach(quality => {
      quality.selected = quality.id === qualityLevels[qualityLevels.selectedIndex].id
    })
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
      player.currentTime(currentTime)

      return
    }

    // 自适应多码率hls流场景
    const qualityLevels = player.qualityLevels()
    const targetQuality = qualityLevels[index]
    const prevTime = performance.now()
    let prevQualityId: number

    toast(`正在为您切换到${Math.min(qualityLevels[index].width, qualityLevels[index].height)}P，请稍等...`)

    // 自适应多码率hls流
    for (let i = 0; i < qualityLevels.length; i++) {
      if (qualityLevels[i].enabled) {
        prevQualityId = qualityLevels[i].id
      }

      qualityLevels[i].enabled = i === index
    }

    // 轮询获取清晰度切换完成的时机
    clearInterval(this.intervalId)
    this.intervalId = setInterval(() => {
      /**
       * 根据视频分辨率来判断，还未完成切换
       * 这里有个问题，如果有些qualityLevel分辨率一样，但bitrate不一样时，会误判，不过总体没啥影响
       * player.videoHeight()实际获取的高度会比qualityHeight大1px
       */
      if (
        Math.abs(player.videoWidth() - targetQuality.width) > 3 ||
        Math.abs(player.videoHeight() - targetQuality.height) > 3
      ) {
        // 超时
        if (performance.now() - prevTime > 10000) {
          // 使用之前的分辨率
          for (let i = 0; i < qualityLevels.length; i++) {
            qualityLevels[i].enabled = qualityLevels[i].id === prevQualityId
          }

          // 切换失败，清除轮询
          toast('切换失败')
          clearInterval(this.intervalId)
        }

        return
      }

      // 切换完成，更新UI、清除轮询
      this.onQualityChange()
      toast(`已切换到${Math.min(qualityLevels[index].width, qualityLevels[index].height)}P`)
      clearInterval(this.intervalId)
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

      if (!source.qualities) {
        this.$set(source, 'qualities', [])
      }

      if (source.qualities!.find(item => item.id === qualityLevel.id)) {
        return
      }

      source.qualities!.push({
        id: qualityLevel.id,
        label: `${Math.min(qualityLevel.width, qualityLevel.height)}P`,
        selected: false
      })
    })
  }

  beforeDestroy() {
    clearInterval(this.intervalId)
  }
}
</script>
