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
import { SOURCES_CHANGED } from './event'
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
import BrightnessGesture from './component/brightness-gesture'
import VolumeGesture from './component/volume-gesture'
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
videojs.registerComponent('VBrightnessGesture', BrightnessGesture)
videojs.registerComponent('VVolumeGesture', VolumeGesture)
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
    const src = JSON.parse(JSON.stringify(this.src))
    const paused = this.player.paused()

    this.player.src(src)
    this.player.currentTime(0)
    this.player[paused ? 'pause' : 'play']()
    this.player.trigger(SOURCES_CHANGED, src)
  }

  @Watch('autoplay')
  onAutoplayChange() {
    if (!this.player) {
      return
    }

    this.player.autoplay(this.autoplay)
  }

  @Watch('loop')
  onLoopChange() {
    if (!this.player) {
      return
    }

    this.player.loop(this.loop)
  }

  @Watch('muted')
  onMutedChange() {
    if (!this.player) {
      return
    }

    this.player.muted(this.muted)
  }

  @Watch('preload')
  onPreloadChange() {
    if (!this.player) {
      return
    }

    this.player.preload(this.preload as any)
  }

  @Watch('poster')
  onPosterChange() {
    if (!this.player) {
      return
    }

    this.player.poster(this.poster!)
  }

  @Watch('controls')
  onControlsChange() {
    if (!this.player) {
      return
    }

    this.player.controls(this.controls)
  }

  @Watch('title')
  onTitleChange() {
    if (!this.player) {
      return
    }

    this.player.trigger('v:title', this.title)
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
              overrideNative: 'MediaSource' in window,
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
          vBrightnessGesture: true,
          vVolumeGesture: true,
          vScrubGesture: true,
          vDoubleClickGesture: true,
          vHeader: true,
          controlBar: {
            children: [
              // {
              //   name: 'volumePanel',
              //   inline: false
              // },
              'vVolume',
              'vProgressControl',
              'vQualitySelector',
              'playbackRateMenuButton',
              // 'chaptersButton',
              // 'descriptionsButton',
              // 'subtitlesButton',
              // 'captionsButton',
              // 'subsCapsButton',
              // 'audioTrackButton',
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

    this.player.src(this.src)
    this.player.trigger(SOURCES_CHANGED, this.src)
    this.player.trigger('v:title', this.title)
    this.player.hlsQualitySelector()
  }
}
</script>
