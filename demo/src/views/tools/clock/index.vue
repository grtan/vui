<template>
  <div>
    <div :class="$style.wrapper">当页面滚动或者退到后台时也能准确计时</div>
    <div>{{time|timeText}}</div>
  </div>
</template>

<style module>
.wrapper {
  margin: 1rem 0;
}
</style>

<script>
import { clock as Clock } from 'vui'

export default {
  data() {
    return {
      time: {}
    }
  },
  filters: {
    timeText({ year, month, date, week, day, hour, minute, second }) {
      if (year === undefined) {
        return ''
      }

      return `${year}年${month}月${date}日 第${week}周 星期${['一', '二', '三', '四', '五', '六', '日'][day - 1]} ${hour}时${minute}分${second}秒`
    }
  },
  created() {
    this.clock = new Clock({
      callback: time => {
        this.time = time
      }
    })
  },
  beforeDestroy() {
    this.clock.destroy()
  }
}
</script>
