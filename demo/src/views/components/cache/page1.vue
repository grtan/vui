<template>
  <div>
    <div :class="$style.timer">计时器：{{time}}</div>
    <div :class="$style.btns">
      <router-link class="button is-fullwidth is-link" :to="{name:'cache-page2'}">下一页</router-link>
    </div>
  </div>
</template>

<style module>
  .timer {
    margin-top: 1rem;
  }

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
