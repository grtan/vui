<template>
  <popup class="vui-popup-picker" :value="value" @input="onInput" v-bind="$attrs" v-on="$listeners">
    <div class="vui-popup-picker-header" v-if="title||cancel||confirm">
      <span class="vui-popup-picker-cancel" v-if="cancel" @click="onCancel">{{cancel}}</span>
      <span class="vui-popup-picker-confirm" v-if="confirm" @click="onConfirm">{{confirm}}</span>
      <p v-if="title">{{title}}</p>
    </div>
    <picker ref="picker" style="height:8rem" @update="onUpdate" v-bind="$attrs"></picker>
  </popup>
</template>

<script>
  import Popup from '../popup/index.vue'
  import Picker from '../picker/index.vue'

  export default {
    name: 'vui-popup-picker',
    components: {
      Popup,
      Picker
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: '请选择'
      },
      cancel: {
        type: String,
        default: '取消'
      },
      confirm: {
        type: String,
        default: '确定'
      }
    },
    methods: {
      onCancel () { // 关闭
        this.$refs.picker.stop(true)
        this.$emit('input', false)
      },
      onInput (value) {
        !value && this.$refs.picker.stop(true)
        this.$emit('input', value)
      },
      onConfirm () { // 点击确定按钮
        this.onCancel()
        // 确保update事件先执行
        this.$nextTick(function () {
          this.$emit('confirm', this.indexs.slice())
        })
      },
      onUpdate (indexs) {
        this.indexs = indexs
        this.$emit('update', this.indexs.slice())
      }
    }
  }
</script>