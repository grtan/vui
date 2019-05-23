<template>
  <a class="vui-button" :vui-inline="inline" :vui-type="type" :vui-shape="shape" :vui-disabled="disabled"
     @click="!disabled&&$emit('click')">
    <slot>确定</slot>
  </a>
</template>

<script>
  export default {
    name: 'vui-button',
    props: {
      inline: { // 是否是内联的小按钮
        type: Boolean,
        default: false
      },
      type: { // 类型
        type: String,
        default: 'default',
        validator(value) {
          return ['default', 'primary', 'danger'].indexOf(value) !== -1
        }
      },
      shape: { // 圆角类型
        type: String,
        default: 'semicircle',
        validator(value) {
          return ['rectangle', 'round', 'semicircle'].indexOf(value) !== -1
        }
      },
      disabled: {
        type: Boolean,
        default: false
      }
    }
  }
</script>