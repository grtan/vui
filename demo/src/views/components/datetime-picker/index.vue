<template>
  <div>
    <p :class="$style.config" class="is-size-5 has-text-centered">配置</p>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">3d旋转样式</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <label class="checkbox"><input type="checkbox" name="enable3d" v-model="enable3d">{{enable3d}}</label>
          </div>
        </div>
      </div>
    </div>
    <p>当前选中的时间：{{indexs}}</p>
    <div :class="$style.btns">
      <a class="button is-primary is-fullwidth is-rounded" @click="show=true">显示</a>
    </div>
    <datetime-picker :class="$style.picker" v-model="show" :enable3d="enable3d" @update="onUpdate"
                 @confirm="onUpdate"></datetime-picker>
  </div>
</template>

<style module>
  .config {
    padding-bottom: .4rem;
  }

  .item {
    padding: .2rem .5rem;
  }

  .btns {
    position: fixed;
    z-index: 9;
    left: .3rem;
    right: .3rem;
    bottom: .3rem;
  }

  .btns :global(.button) {
    margin-top: .15rem;
  }

  .picker :global(.vui-picker) {
    height: 7rem !important;
  }
</style>

<script>
import { DatetimePicker } from 'vui'

export default {
  components: {
    DatetimePicker
  },
  data () {
    return {
      show: false,
      enable3d: true,
      indexs: []
    }
  },
  methods: {
    onUpdate (value) {
      console.log('选择的时间：', value)
      this.indexs = value
    }
  }
}
</script>
