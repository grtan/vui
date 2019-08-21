<template>
  <svg
    :class="$options.name"
    aria-hidden="true"
    :data-disabled="disabled"
    @click="!disabled&&$emit('click')"
  >
    <use :xlink:href="`#${$options.name}-${type}`" />
  </svg>
</template>

<script>
import { libName } from '../../config'

export default {
  name: `${libName}-icon`,
  props: {
    type: { // 图标名称
      type: String,
      default: ''
    },
    disabled: { // 禁用
      type: Boolean,
      default: false
    }
  }
}
</script>
