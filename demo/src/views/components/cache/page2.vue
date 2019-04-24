<template>
  <div>
    <div :class="$style.timer">计时器：{{time}}</div>
  </div>
</template>

<style module>
  .timer {
    margin-top: 1rem;
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
