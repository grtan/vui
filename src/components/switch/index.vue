<template>
  <div class="vui-switch" :style="style" :vui-checked="value" :vui-disabled="disabled" @click="click">
    <div :style="{backgroundColor:color[0]}"></div>
    <div></div>
  </div>
</template>

<script>
  export default {
    name: 'vui-switch',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      color: { // 背景色
        type: Array,
        default () {
          return ['#fff', '#456fff']
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      prevent: { // 是否阻止自动切换
        type: Boolean,
        default: false
      }
    },
    computed: {
      style () {
        return this.value ? {
          backgroundColor: this.color[1]
        } : {}
      }
    },
    watch: {
      value (value) {
        this.$emit('change', value)
      }
    },
    methods: {
      click () {
        if (!this.disabled) {
          this.$emit('click', this.value)
          !this.prevent && this.$emit('input', !this.value)
        }
      }
    }
  }
</script>