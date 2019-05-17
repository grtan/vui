<template>
  <vui-dialog class="vui-popup-picker" :value="value" :btns="btns" v-bind="$attrs" @input="onInput"
              @btn-click="onBtnClick">
    <picker ref="picker" v-bind="$attrs" @update="onUpdate"></picker>
  </vui-dialog>
</template>

<style lang="less">
  @import "../../assets/style/base";

  @name: ~"@{lib-name}-popup-picker";

  .@{name} {
    .@{lib-name}-dialog-box {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
  }
</style>

<script>
  import VuiDialog from '../dialog/index.vue'
  import Picker from '../picker/index.vue'

  export default {
    name: 'vui-popup-picker',
    components: {
      VuiDialog,
      Picker
    },
    props: {
      value: {
        type: Boolean,
        default: false
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
    computed: {
      btns() {
        const btns = []

        this.confirmIndex = undefined
        this.cancel && btns.push(this.cancel)

        if (this.confirm) {
          this.confirmIndex = btns.length
          btns.push(this.confirm)
        }

        return btns
      }
    },
    methods: {
      onInput (value) {
        !value && this.$refs.picker.stop(true)
        this.$emit('input', value)
      },
      onBtnClick (index) {
        this.$refs.picker.stop(true)
        this.$emit('input', false)
        // 确保update事件先执行
        index === this.confirmIndex && this.$nextTick(function () {
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