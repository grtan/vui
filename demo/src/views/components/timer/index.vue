<template>
  <div>
    <div :class="$style.wrapper">
      <div :class="$style.left">正计时：
        <timer :pause="pause1"></timer>
      </div>
      暂停：<label class="checkbox"><input type="checkbox" name="pause1" v-model="pause1">{{pause1}}</label>
    </div>
    <div :class="$style.wrapper">
      <div :class="$style.left">倒计时：
        <timer :from="10" :pause="pause2" @change="onChange"></timer>
      </div>
      暂停：<label class="checkbox"><input type="checkbox" name="pause2" v-model="pause2">{{pause2}}</label>
    </div>
  </div>
</template>

<style module>
  .wrapper {
    margin: 1rem 0;
  }

  .left {
    display: inline-block;
    width: 50%;
  }
</style>

<script>
  import { Timer } from 'vui'

  export default {
    components: {
      Timer
    },
    data () {
      return {
        pause1: false,
        pause2: false
      }
    },
    methods: {
      onChange(value, complete) {
        this.$vui.toast.show({
          slot: `${value}${complete ? '——倒计时完成' : ''}`,
          position: 'bottom',
          single: false,
          time: 500
        })
      }
    }
  }
</script>
