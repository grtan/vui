<template>
  <div v-show="prev !== Infinity" class="vui-video__brightness-gesture">
    <div class="vui-video__brightness-gesture-progress-bar">
      <div class="vui-video__brightness-gesture-progress" :style="{ width: `${value * 100}%` }"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Hammer from 'hammerjs'

@Component({
  name: 'VuiVideoBrightnessGesture'
})
export default class VComponent extends Vue {
  private value = 0
  private prev = Infinity
  private timeoutId!: number

  created() {
    const videoEl = this.$options.player!.$('video')
    const hammerManager = new Hammer.Manager(videoEl)

    hammerManager.add(
      new Hammer.Pan({
        /**
         * 当设置成DIRECTION_VERTICAL时，只有触摸在垂直方向上产生移动后才触发panstart事件
         * 如果用户先水平滑动再垂直滑动，可能就会有一些bug
         * 所以这里使用全部方向，自行在panstart中判断方向
         */
        direction: Hammer.DIRECTION_ALL
      })
    )

    hammerManager.on('panstart', event => {
      const { left, width } = event.target.getBoundingClientRect()
      const isVertical = (event.angle > 60 && event.angle < 120) || (event.angle < -60 && event.angle > -120)

      this.prev = Infinity

      // 非有效区域
      if (event.center.x > left + width * 0.33 || !isVertical) {
        return
      }

      this.prev = event.center.y
      clearTimeout(this.timeoutId)
    })

    hammerManager.on('panmove', event => {
      // 已经判定为无效滑动
      if (this.prev === Infinity) {
        return
      }

      const { height } = event.target.getBoundingClientRect()
      const current = event.center.y
      const delta = current - this.prev

      this.value += -(delta / height) * 1.7

      if (this.value < 0) {
        this.value = 0
      } else if (this.value > 1) {
        this.value = 1
      }

      this.prev = current
    })

    hammerManager.on('panend', () => {
      if (this.prev === Infinity) {
        return
      }

      // 延迟一段时间后隐藏UI
      clearTimeout(this.timeoutId)
      this.timeoutId = window.setTimeout(() => {
        this.prev = Infinity
      }, 2000)
    })
  }
}
</script>
