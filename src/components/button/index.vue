<template>
  <a
    :class="$options.name"
    :vui-inline="inline"
    :vui-type="type"
    :vui-shape="shape"
    :vui-disabled="disabled"
    @click="!disabled&&$emit('click')"
  >
    <slot>{{$t('ok')}}</slot>
  </a>
</template>

<script>
import { libName } from '../../config'
import translation from '../../mixins/translation'
import message from './lang/zh-CN'

export default {
  name: `${libName}-button`,
  mixins: [translation],
  props: {
    inline: { // 是否是内联的小按钮
      type: Boolean,
      default: false
    },
    type: { // 类型
      type: String,
      default: 'default',
      validator (value) {
        return ['default', 'primary', 'danger'].indexOf(value) !== -1
      }
    },
    shape: { // 圆角类型
      type: String,
      default: 'semicircle',
      validator (value) {
        return ['rectangle', 'round', 'semicircle'].indexOf(value) !== -1
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  beforeCreate () {
    this.message = message
  }
}
</script>
