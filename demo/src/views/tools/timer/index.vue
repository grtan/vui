<template>
  <div>
    <div :class="$style.wrapper">当页面滚动或者退到后台时也能准确计时</div>
    <div :class="$style.wrapper" v-for="(time,index) in times" :key="index">
      <div
        v-if="options[index].countdown!==last"
        :tmp="last=options[index].countdown"
      >{{options[index].countdown?'倒计时':'从相同时间正计时'}}</div>
      <div :class="$style.left">format: {{options[index].format}}</div>
      <div :class="$style.right">{{time|timeText}}</div>
    </div>
  </div>
</template>

<style module>
.wrapper {
  margin: 1rem 0;
}

.left {
  float: left;
  width: 50%;
  text-align: right;
}

.right {
  text-align: right;
}
</style>

<script>
import { timer as Timer } from 'vui'

export default {
  data() {
    return {
      options: [{
        format: 'dd HH:mm:ss',
        countdown: true
      }, {
        format: 'd HH:mm:ss',
        countdown: true
      }, {
        format: 'HH:mm:ss',
        countdown: true
      }, {
        format: 'HH:s',
        countdown: true
      }, {
        format: 'mm:ss',
        countdown: true
      }, {
        format: 'HH',
        countdown: true
      }, {
        format: 'm',
        countdown: true
      }, {
        format: 's',
        countdown: true
      }, {
        format: 'dd HH:mm:ss',
        countdown: false
      }, {
        format: 'd HH:mm:ss',
        countdown: false
      }, {
        format: 'HH:mm:ss',
        countdown: false
      }, {
        format: 'HH:m:s',
        countdown: false
      }, {
        format: 'mm:ss',
        countdown: false
      }, {
        format: 's',
        countdown: false
      }],
      times: []
    }
  },
  filters: {
    timeText({ day, hour, minute, second }) {
      let text = ''

      day !== undefined && (text += `${day}天`)
      hour !== undefined && (text += `${hour}时`)
      minute !== undefined && (text += `${minute}分`)
      second !== undefined && (text += `${second}秒`)

      return text
    }
  },
  created() {
    const from = 1.795 * 24 * 3600

    this.last = undefined
    this.timers = []
    this.options.forEach(({ format, countdown }, index) => {
      this.timers.push(new Timer({
        from,
        countdown,
        format,
        callback: (time, complete) => {
          this.$set(this.times, index, time)
        }
      }).play())
    })
  }
}
</script>
