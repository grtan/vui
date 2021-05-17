<template>
  <div :class="['vui-marquee', `vui-marquee--${direction}`]">
    <div class="vui-marquee__wrapper" :style="wrapperStyle">
      <div ref="content" class="vui-marquee__content" :style="contentStyle">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { getViewportScale } from '@/utils/index'

@Component({
  name: 'VuiMarquee'
})
export default class VComponent extends Vue {
  // viewport scale比例
  private viewportScale = getViewportScale()
  private elSize = 0
  private contentSize = 0
  private contentStyle = {}

  // 滚动方向
  @Prop({
    type: String,
    default: 'left'
  })
  readonly direction!: 'left' | 'right' | 'up' | 'down'

  // 滚动速度
  @Prop({
    type: Number,
    default: 1
  })
  readonly speed!: number

  // 间距
  @Prop({
    type: Number,
    default: 50
  })
  readonly spacing!: number

  // 播放/暂停滚动
  @Prop({
    type: Boolean,
    default: true
  })
  readonly play!: boolean

  // viewport实际scale下的间距
  get fixedSpacing() {
    return this.spacing / this.viewportScale
  }

  get isHorizontal() {
    return ['left', 'right'].includes(this.direction)
  }

  // 一轮滚动时长
  get duration() {
    // 内容未溢出，返回0，表示无动画
    if (this.contentSize <= this.elSize) {
      return 0
    }

    // 在viewport scale=1的场景下，1s移动40px
    return ((this.contentSize + this.fixedSpacing) * this.viewportScale * 1000) / 40 / this.speed
  }

  get wrapperStyle() {
    return {
      animationDuration: `${this.duration}ms`,
      animationPlayState: this.play ? 'running' : 'paused'
    }
  }

  @Watch('direction')
  @Watch('spacing')
  async update() {
    const content = this.$refs.content as HTMLElement

    // 删除复制的节点
    content.nextElementSibling?.remove()
    // 重置content样式
    this.contentStyle = {}
    await this.$nextTick()

    // 这里不用getBoundingClientRect，防止受transform影响
    this.elSize = this.$el[this.isHorizontal ? 'clientWidth' : 'clientHeight']
    this.contentSize = content[this.isHorizontal ? 'offsetWidth' : 'offsetHeight']

    // content内容超长了，需要滚动
    if (this.contentSize > this.elSize) {
      this.contentStyle = {
        [`margin${this.isHorizontal ? 'Right' : 'Bottom'}`]: `${this.fixedSpacing}px`
      }
      await this.$nextTick()
      // 复制一份content
      content.parentNode!.appendChild(content.cloneNode(true))
    }
  }

  mounted() {
    this.update()
  }
}
</script>
