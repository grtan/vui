<template>
  <div class="vui-switch" :class="{'vui-switch-checked':value,'vui-switch-disabled':disabled}" :style="style"
       @click="click">
    <template v-if="!this.image||!this.image.length">
      <div :style="{backgroundColor:color[0]}"></div>
      <div></div>
    </template>
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
          return ['#fff', '#ffe26d']
        }
      },
      image: { // 背景图片
        type: Array,
        default () {
          return []
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
        if (this.image && this.image.length) { // 优先使用背景图
          return {
            backgroundColor: 'transparent',
            backgroundImage: `url(${this.image[this.value ? 1 : 0]})`
          }
        } else {
          return this.value ? {
            backgroundColor: this.color[1]
          } : {}
        }
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