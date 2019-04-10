<template>
  <i class="vui-icon" :vui-type="value" :vui-disabled="disabled" @click="!disabled&&$emit('click')"></i>
</template>

<script>
  export default {
    name: 'vui-icon',
    props: {
      type: { // 类型
        type: String, // 16进制的unicode编码字符串
        required: true
      },
      disabled: { // 禁用
        type: Boolean,
        default: false
      }
    },
    computed: {
      value() {
        return String.fromCharCode(parseInt(this.type, 16))
      }
    }
  }
</script>