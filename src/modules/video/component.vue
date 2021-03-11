<template>
  <div
    :class="[
      'vui-video',
      {
        'vui-video--playing': !paused,
        'vui-video--inactive': !useractive,
        'vui-video--4g': is4G
      }
    ]"
  >
    <video ref="video" class="video-js"></video>

    <!-- 底部播放进度 -->
    <div v-show="!paused && !useractive" class="vui-video__progress-bar vui-video__progress-bar--play">
      <!-- <div class="vui-video__progress-loaded"></div> -->
      <div
        class="vui-video__progress vui-video__progress--play"
        :style="{ width: `${(currentTime / duration) * 100}%` }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import videojs, { VideoJsPlayer } from 'video.js'
import qualitySelector from '@silvermine/videojs-quality-selector'
import Hammer from 'hammerjs'
import VuiTransition from '../transition'
import './component/current-time-display'
import './component/seek-bar'
import ProgressControl from './component/progress-control'
import Guide from './component/guide'
import VolumeGesture from './component/volume-gesture'
import BrightnessGesture from './component/brightness-gesture'
import ScrubGesture from './component/scrub-gesture'
import PlayControl from './component/play-control'

// 覆盖默认的SeekBar组件
// videojs.registerComponent('SeekBar', SeekBar)
videojs.registerComponent('VProgressControl', ProgressControl)
videojs.registerComponent('VGuide', Guide)
videojs.registerComponent('VVolumeGesture', VolumeGesture)
videojs.registerComponent('VBrightnessGesture', BrightnessGesture)
videojs.registerComponent('VScrubGesture', ScrubGesture)
videojs.registerComponent('VPlayControl', PlayControl)
qualitySelector(videojs)

@Component({
  name: 'VuiVideo',
  components: {
    VuiTransition
  }
})
export default class VComponent extends Vue {
  private player!: VideoJsPlayer
  // 是否暂停
  private paused = true
  // 用户是否交互
  private useractive = true
  // 当前亮度
  private brightness = 0
  // 当前音量
  private volume = 0
  // 当前定位时间
  private seek = 0
  // 视频总时长，直播时值为Infinity
  private duration = 0
  // 是否正在定位
  private seeking = false
  // 是否正在等待加载
  private waiting = false
  private hammerManager!: InstanceType<typeof Hammer>
  // 是否为移动网络
  private is4G = true
  // 当前播放时间
  private currentTime = 0
  // 已经显示过的引导
  private shownGuides = ['volume', 'brightness', 'seek', 'play']
  // 待显示待引导
  private unshownGuides: string[] = []

  // 手势动作
  private gesture: 'brightness' | 'volume' | 'seek' | '' = ''

  @Prop({
    type: [String, Object, Array],
    required: true
  })
  readonly src!: string | videojs.Tech.SourceObject | videojs.Tech.SourceObject[]

  @Prop({
    type: Object,
    default() {
      return {
        width: 1200,
        preload: 'auto',
        controls: true,
        bigPlayButton: false,
        // 直播时使用新风格UI
        liveui: true,
        controlBar: {
          children: [
            {
              name: 'volumePanel',
              inline: false
            },
            // 'currentTimeDisplay',
            'vProgressControl',
            // 'remainingTimeDisplay',
            'fullscreenToggle'
          ]
          // playToggle: false,
          // volumePanel: {
          //   inline: false
          // },
          // progressControl: false,
          // vProgressBar: true,
          // // progressControl: {
          // //   seekBar: false,
          // //   vSeekBar: SeekBar.prototype.__proto__.options_
          // // },
          // pictureInPictureToggle: false,
          // qualitySelector: true
          // currentTimeDisplay: false
        },
        vBrightnessGesture: true,
        vVolumeGesture: true,
        vScrubGesture: true,
        vGuide: true,
        vPlayControl: true,
        userActions: {
          doubleClick: false
          // doubleClick(this: VComponent['player']) {
          //   console.log(this.paused(), 22)
          //   this[this.paused() ? 'play' : 'pause']()
          // }
        }
      }
    }
  })
  readonly options!: videojs.PlayerOptions

  // 是否为直播
  get isLive() {
    return this.duration === Infinity
  }

  onPlay() {
    // setTimeout(() => {
    //   const now = Date.now()
    //   setInterval(() => {
    //     this.player.pause()
    //     this.player.currentTime((Date.now() - now) / 1000)
    //   }, 1000)
    // }, 10000)
  }

  @Watch('seek')
  onSeekChange() {
    if (this.seek !== this.currentTime) {
      this.player.currentTime(this.seek)
      this.player.getDescendant(['ControlBar', 'ProgressControl', 'SeekBar']).update()
    }
  }

  mounted() {
    this.player = videojs(this.$refs.video, this.options, function (this: any) {
      this.off(this.tech_, 'mouseup', this.handleTechClick_)
    })
    this.player.src([
      // {
      //   src: 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8'
      // }
      {
        src: 'https://d2zihajmogu5jn.cloudfront.net/sintel/rendition/rendition.m3u8',
        label: '720P'
      },
      {
        src: 'https://test-bj-ws.vivo.com.cn/OsKFHoFL2MR7QsdJ/gfandroid/2020091117371717000001.mp4',
        label: '1080P'
      }
    ])
    // this.player.src('https://test-bj-ws.vivo.com.cn/OsKFHoFL2MR7QsdJ/gfandroid/2020091117371717000001.mp4')
    // this.player.src('http://220.161.87.62:8800/hls/0/index.m3u8')

    this.player.on('durationchange', () => {
      this.duration = this.player.duration()
    })

    this.player.on(['useractive', 'userinactive'], event => {
      this.useractive = event.type === 'useractive'
    })

    this.player.on(['play', 'pause'], event => {
      this.paused = event.type === 'pause'
    })

    this.player.on(['seeking', 'seeked'], event => {
      this.seeking = event.type === 'seeking'
    })

    // 监听播放进度
    this.player.on(['timeupdate', 'ended'], () => {
      this.currentTime = this.player.currentTime()
      console.log('timeupdate', this.currentTime)
    })

    // 监听是否在等待加载
    this.player.on('waiting', () => {
      this.waiting = true

      const timeWhenWaiting = this.player.currentTime()
      const timeUpdateListener = () => {
        if (timeWhenWaiting !== this.player.currentTime()) {
          this.waiting = false
          this.player.off('timeupdate', timeUpdateListener)
        }
      }

      this.player.on('timeupdate', timeUpdateListener)
    })

    // 监听加载进度
    // this.player.on('progress', () => {})

    console.log(456, this.player.getVideoPlaybackQuality())

    // this.setGesture()
    // this.setBrightnessGesture()

    // console.log(videojs.getComponent())
    // console.log(this.player.getDescendant(['ControlBar', 'CurrentTimeDisplay']))

    // this.player.getDescendant(['ControlBar', 'RemainingTimeDisplay'])

    // const remainingTimeDisplay = this.player.getChild('ControlBar')?.getChild('RemainingTimeDisplay')!

    // console.log(this.player.getChild('ControlBar')?.getChild('RemainingTimeDisplay')?.contentEl())
    // console.log(remainingTimeDisplay.$(':nth-child(2)', remainingTimeDisplay.el()))

    // this.player.addChild('BigPlayButton')
  }

  // 设置手势
  setGesture() {
    let prev: number

    this.hammerManager = new Hammer.Manager(this.$refs.video as EventTarget)

    this.hammerManager.add(
      new Hammer.Pan({
        direction: Hammer.DIRECTION_ALL
      })
    )

    this.hammerManager.on('panstart', event => {
      const { left, right } = event.target.getBoundingClientRect()
      const isHorizontal = (event.angle > -30 && event.angle < 30) || event.angle > 150 || event.angle < -150
      const isVertical = (event.angle > 60 && event.angle < 120) || (event.angle < -60 && event.angle > -120)

      this.gesture = ''

      // 左侧区域亮度调节
      if (event.center.x < left + (right - left) * 0.33 && isVertical) {
        this.gesture = 'brightness'
        prev = event.center.y
        return
      }

      // 右侧区域音量调节
      if (event.center.x > right - (right - left) * 0.33 && isVertical) {
        this.gesture = 'volume'
        prev = event.center.y
        return
      }

      // 手势快进、后退，直播时不支持
      if (isHorizontal && !this.isLive) {
        this.gesture = 'seek'
        this[this.gesture] = this.player.currentTime()
        prev = event.center.x
      }
    })

    this.hammerManager.on('panmove', event => {
      // 已经判定为无效滑动
      if (!this.gesture) {
        return
      }

      const videoHeight = this.player.videoHeight()
      // const videoWidth = this.player.videoWidth()
      const current = event.center[['brightness', 'volume'].includes(this.gesture) ? 'y' : 'x']
      const delta = current - prev

      // console.log(this.player.videoHeight(), this.player.height(), this.player.currentHeight())

      // console.log('up', event, this[type], -event.deltaY / videoHeight)

      if (['brightness', 'volume'].includes(this.gesture)) {
        this[this.gesture] += -(delta / videoHeight) * 1.7

        if (this[this.gesture] < 0) {
          this[this.gesture] = 0
        } else if (this[this.gesture] > 1) {
          this[this.gesture] = 1
        }
      } else {
        // 1px间距就调整1s
        this[this.gesture] += delta

        if (this[this.gesture] < 0) {
          this[this.gesture] = 0
        } else if (this[this.gesture] > this.duration) {
          this[this.gesture] = this.duration
        }
      }

      prev = current
    })

    this.hammerManager.on('panend', () => {
      if (this.gesture === 'seek') {
        this.player.currentTime(this[this.gesture])
      }

      this.gesture = ''
    })
  }

  formatTime(seconds: number) {
    return videojs.formatTime(seconds, 600)
  }
}
</script>
