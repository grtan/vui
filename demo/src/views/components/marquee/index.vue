<template>
  <div>
    <p :class="$style.config" class="is-size-5 has-text-centered">配置</p>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">方向</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control level is-mobile">
            <label class="radio level-item"><input type="radio" name="direction" value="left"
                                                   v-model="direction">&nbsp;向左</label>
            <label class="radio level-item"><input type="radio" name="direction" value="right"
                                                   v-model="direction">&nbsp;向右</label>
            <label class="radio level-item"><input type="radio" name="direction" value="up"
                                                   v-model="direction">&nbsp;向上</label>
            <label class="radio level-item"><input type="radio" name="direction" value="down"
                                                   v-model="direction">&nbsp;向下</label>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">速度</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control level is-mobile">
            <label class="radio level-item"><input type="radio" name="duration" value="10000"
                                                   v-model.number="duration">&nbsp;10s</label>
            <label class="radio level-item"><input type="radio" name="duration" value="20000"
                                                   v-model.number="duration">&nbsp;20s</label>
            <label class="radio level-item"><input type="radio" name="duration" value="30000"
                                                   v-model.number="duration">&nbsp;30s</label>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">间距</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control level is-mobile">
            <label class="radio level-item"><input type="radio" name="spacing" value="0.25"
                                                   v-model.number="spacing">&nbsp;0.25</label>
            <label class="radio level-item"><input type="radio" name="spacing" value="0.5"
                                                   v-model.number="spacing">&nbsp;0.5</label>
            <label class="radio level-item"><input type="radio" name="spacing" value="0.75"
                                                   v-model.number="spacing">&nbsp;0.75</label>
          </div>
        </div>
      </div>
    </div>
    <marquee :class="[$style.marquee,['up','down'].includes(direction)&&$style.vertical]" ref="marquee"
             :direction="direction" :duration="duration" :spacing="spacing">
      通知：vivo-ui组件库v1.0上线啦，欢迎大家使用与共建。
    </marquee>
  </div>
</template>

<style module>
  .marquee {
    margin: 2rem auto;
  }

  .vertical {
    width: 1.5em;
    height: 15em;
  }
</style>

<script>
  import { Marquee } from 'vui'

  export default {
    components: {
      Marquee
    },
    data () {
      return {
        direction: 'left',
        duration: 10000,
        spacing: 0.25
      }
    }
  }
</script>
