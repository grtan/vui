<template>
  <div v-show="prev !== Infinity" class="vui-video__volume-gesture">
    <div class="vui-video__volume-gesture-progress-bar">
      <div class="vui-video__volume-gesture-progress" :style="{ width: `${value * 100}%` }"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Hammer from 'hammerjs'

@Component({
  name: 'VuiVideoVolumeGesture'
})
export default class VComponent extends Vue {
  private value = 0
  private prev = Infinity

  created() {
    const hammerManager = new Hammer.Manager(this.$options.player!.el())

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
      this.prev = Infinity

      // 不是在video元素上滑动
      if (event.target.tagName.toLowerCase() !== 'video') {
        return
      }

      const { right, width } = event.target.getBoundingClientRect()
      const isVertical = (event.angle > 60 && event.angle < 120) || (event.angle < -60 && event.angle > -120)

      // 非有效区域，或者不是垂直滑动
      if (event.center.x < right - width * 0.33 || !isVertical) {
        return
      }

      this.prev = event.center.y
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
      this.prev = Infinity
    })
  }
}
</script>
