<template>
  <vui-dialog
    :class="$options.name"
    :value="value"
    :btns="btns"
    v-bind="$attrs"
    @input="onInput"
    @btn-click="onBtnClick"
  >
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
import { libName } from '../../config'
import VuiDialog from '../dialog/index.vue'
import Picker from '../picker/index.vue'
import translation from '../../mixins/translation'
import message from './lang/zh-CN'

export default {
  name: `${libName}-popup-picker`,
  components: {
    VuiDialog,
    Picker
  },
  mixins: [translation],
  props: {
    value: {
      type: Boolean,
      default: false
    },
    cancel: {
      type: String,
      default: '_取消_'
    },
    confirm: {
      type: String,
      default: '_确定_'
    }
  },
  computed: {
    btns () {
      const btns = []

      this.confirmIndex = undefined
      this.cancel && btns.push(this.cancel === '_取消_' ? this.$t('cancel') : this.cancel)

      if (this.confirm) {
        this.confirmIndex = btns.length
        btns.push(this.confirm === '_确定_' ? this.$t('ok') : this.confirm)
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
  },
  beforeCreate () {
    this.message = message
  }
}
</script>
