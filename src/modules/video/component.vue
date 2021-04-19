<template>
  <!-- 这里必须在外面包裹一个元素，否则videojs初始化后，this.$el是video元素而不是videojs自动在外面套的div元素，
  此时如果在父组件中设置的style或者attribute会绑定到video元素而不是真正的根节点，人为在外面包裹div元素后就不存在该问题 -->
  <div class="vui-video">
    <video ref="video" class="video-js" webkit-playsinline playsinline></video>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import videojs, { VideoJsPlayer } from 'video.js'
import 'videojs-contrib-quality-levels'
import { SOURCES_CHANGED, MUTED_CHANGED, TITLE_CHANGED } from './event'
import Header from './component/header'
import Volume from './component/volume'
import ProgressControl from './component/progress-control'
import QualitySelector from './component/quality-selector'
import Fullscreen from './component/fullscreen'
import PlayControl from './component/play-control'
import Loading from './component/loading'
import ProgressBar from './component/progress-bar'
import NetMonitor from './component/net-monitor'
import Guide from './component/guide'
import ScrubGesture from './component/scrub-gesture'
import DoubleClickGesture from './component/double-click-gesture'

videojs.registerComponent('VHeader', Header)
videojs.registerComponent('VVolume', Volume)
videojs.registerComponent('VProgressControl', ProgressControl)
videojs.registerComponent('VQualitySelector', QualitySelector)
videojs.registerComponent('VFullscreen', Fullscreen)
videojs.registerComponent('VPlayControl', PlayControl)
videojs.registerComponent('VLoading', Loading)
videojs.registerComponent('VProgressBar', ProgressBar)
videojs.registerComponent('VNetMonitor', NetMonitor)
videojs.registerComponent('VGuide', Guide)
videojs.registerComponent('VScrubGesture', ScrubGesture)
videojs.registerComponent('VDoubleClickGesture', DoubleClickGesture)

@Component({
  name: 'VuiVideo',
  inheritAttrs: false
})
export default class VComponent extends Vue {
  player!: VideoJsPlayer

  @Prop({
    type: [String, Object, Array],
    required: true
  })
  readonly src!: string | videojs.Tech.SourceObject | videojs.Tech.SourceObject[]

  @Prop({
    type: [String, Boolean],
    default: false
  })
  readonly autoplay!: NonNullable<videojs.PlayerOptions['autoplay']>

  @Prop({
    type: Boolean,
    default: false
  })
  readonly loop!: NonNullable<videojs.PlayerOptions['loop']>

  @Prop({
    type: Boolean,
    default: true
  })
  readonly muted!: NonNullable<videojs.PlayerOptions['muted']>

  @Prop({
    type: String,
    default: 'none'
  })
  readonly preload!: NonNullable<videojs.PlayerOptions['preload']>

  @Prop({
    type: String,
    required: false
  })
  readonly poster: videojs.PlayerOptions['poster']

  @Prop({
    type: Boolean,
    default: true
  })
  readonly controls!: NonNullable<videojs.PlayerOptions['controls']>

  @Prop({
    type: Object,
    required: false
  })
  readonly options?: videojs.PlayerOptions

  @Prop({
    type: String,
    default: ''
  })
  readonly title!: string

  @Watch('src')
  onSrcChange() {
    this.player?.trigger(SOURCES_CHANGED, this.src)
  }

  @Watch('autoplay')
  onAutoplayChange() {
    this.player?.autoplay(this.autoplay)
  }

  @Watch('loop')
  onLoopChange() {
    this.player?.loop(this.loop)
  }

  @Watch('muted')
  onMutedChange() {
    this.player?.trigger(MUTED_CHANGED, this.muted)
  }

  @Watch('preload')
  onPreloadChange() {
    this.player?.preload(this.preload as any)
  }

  @Watch('poster')
  onPosterChange() {
    this.player?.poster(this.poster!)
  }

  @Watch('controls')
  onControlsChange() {
    this.player?.controls(this.controls)
  }

  @Watch('title')
  onTitleChange() {
    this.player?.trigger(TITLE_CHANGED, this.title)
  }

  mounted() {
    this.player = videojs(
      this.$refs.video,
      {
        ...this.options,
        ...{
          /**
           * 基础设置
           */
          autoplay: this.autoplay,
          loop: this.loop,
          muted: this.muted,
          preload: this.preload,
          poster: this.poster,
          controls: this.controls,
          userActions: {
            // 禁用双击全屏
            doubleClick: false
          },
          html5: {
            vhs: {
              // 当支持MediaSource时覆盖原生hls支持
              overrideNative: 'MediaSource' in window,
              // 自适应多码率流清晰度无缝切换
              smoothQualityChange: true
            }
          },
          /**
           * 组件设置
           */
          // 去掉默认组件
          bigPlayButton: false,
          loadingSpinner: false,
          // errorDisplay: false,
          // 添加自定义组件
          vPlayControl: true,
          vLoading: true,
          vProgressBar: true,
          vNetMonitor: true,
          vGuide: true,
          vScrubGesture: true,
          vDoubleClickGesture: true,
          vHeader: true,
          controlBar: {
            children: [
              'vVolume',
              'vProgressControl',
              'vQualitySelector',
              'playbackRateMenuButton',
              // 'pictureInPictureToggle',
              'vFullscreen'
            ]
          }
        }
      },
      () => {
        this.player.off(this.player.tech(), 'mouseup', (this.player as any).handleTechClick_)
      }
    )

    // 用户点击改变了静音时，同步到父组件中
    this.player.on(MUTED_CHANGED, (event, muted: boolean) => {
      if (this.muted === muted) {
        return
      }

      this.$emit('update:muted', muted)
    })

    this.onSrcChange()
    this.onMutedChange()
    this.onTitleChange()
  }

  beforeDestroy() {
    this.player.dispose()
  }
}
</script>
