<template>
  <div :class="$options.name">
    <slot></slot>
  </div>
</template>

<script>
import { libName } from '../../config'

export default {
  name: `${libName}-swiper-item`,
  /**
   * 只能检测数目变化，无法检测内容变化
   * https://github.com/vuejs/vue/issues/6133
   */
  mounted () {
    this.$parent.update()
  },
  beforeDestroy () {
    const $parent = this.$parent

    this.$nextTick(function () {
      $parent.update()
    })
  }
}
</script>
