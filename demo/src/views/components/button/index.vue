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
            <label class="radio level-item"><input type="radio" name="type" value="default"
                                                   v-model="type">default</label>
            <label class="radio level-item"><input type="radio" name="type" value="primary"
                                                   v-model="type">primary</label>
            <label class="radio level-item"><input type="radio" name="type" value="danger"
                                                   v-model="type">danger</label>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">形状</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control level is-mobile">
            <label class="radio level-item"><input type="radio" name="shape" value="rectangle"
                                                   v-model="shape">rectangle</label>
            <label class="radio level-item"><input type="radio" name="shape" value="round"
                                                   v-model="shape">round</label>
            <label class="radio level-item"><input type="radio" name="shape" value="semicircle"
                                                   v-model="shape">semicircle</label>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">内联小按钮</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <label class="checkbox"><input type="checkbox" name="inline" v-model="inline">{{inline}}</label>
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
    <div :class="$style.btn">
      <vui-button :type="type" :shape="shape" :inline="inline" :disabled="disabled" @click="onClick"></vui-button>
    </div>
  </div>
</template>

<style module>
  .config {
    padding-bottom: .4rem;
  }

  .btn {
    position: fixed;
    left: .3rem;
    right: .3rem;
    bottom: .3rem;
  }
</style>

<script>
  import { Button } from 'vui'

  export default {
    components: {
      VuiButton: Button
    },
    data () {
      return {
        type: 'default',
        shape: 'semicircle',
        inline: false,
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
