<template>
  <div :class="$options.name" v-bind="attrs" @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
  import { libName } from '../../config'

  export default {
    name: `${libName}-tab-item`,
    data() {
      return {
        selected: false, // 是否选中
        selectedAttr: '' // 选中时添加的属性名称
      }
    },
    computed: {
      attrs() {
        return {
          [this.selectedAttr]: this.selected
        }
      }
    },
    methods: {
      onClick() {
        // 根据dom来确定位置
        this.$parent.onItemClick([].slice.call(this.$el.parentElement.children).findIndex(child => {
          return child === this.$el
        }))
      },
      setState(selected, selectedAttr) { // 设置是否选中
        this.selected = selected
        this.selectedAttr = selectedAttr
      }
    }
  }
</script>