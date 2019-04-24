<template>
  <div>
    <div class="content is-small">
      <p>当点击浏览器前进或者后退按钮到该页面时，下面倒计时器不会重置。整个demo也使用了cache组件，可以切换页面看下效果。</p>
    </div>
    <div>计时器：{{time}}</div>
    <div :class="$style.btns">
      <router-link class="button is-fullwidth is-link" :to="{name:'cache-page1'}">下一页</router-link>
    </div>
  </div>
</template>

<style module>
  .btns {
    position: fixed;
    left: .3rem;
    right: .3rem;
    bottom: .3rem;
  }
</style>

<script>
  export default {
    data () {
      return {
        time: 0
      }
    },
    created() {
      this.timer = setInterval(() => {
        this.time++
      }, 1000)
    },
    beforeDestroy() {
      clearInterval(this.timer)
    }
  }
</script>
