<template>
  <div>
    <p :class="$style.config" class="is-size-5 has-text-centered">配置</p>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">类型</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control level is-mobile">
            <input class="input" type="text" name="type" v-model="type">
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">禁用</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <label class="checkbox"><input type="checkbox" name="disabled" v-model="disabled">{{disabled}}</label>
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.icon">
      <icon :type="type" :disabled="disabled" @click="onClick"></icon>
    </div>
  </div>
</template>

<style module>
  .config {
    padding-bottom: .4rem;
  }

  .icon {
    margin-top: 1rem;
    text-align: center;
  }
</style>

<script>
  import { Icon } from 'vui'

  export default {
    components: {
      Icon
    },
    data () {
      return {
        type: 'e66c',
        disabled: false
      }
    },
    methods: {
      onClick() {
        this.$vui.toast.show({
          slot: 'click事件',
          position: 'bottom'
        })
      }
    }
  }
</script>
