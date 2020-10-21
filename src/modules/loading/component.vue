<template>
  <div class="vui-loading">
    <div class="vui-loading__icon">icon</div>
    <div class="vui-loading__text"><slot></slot></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'VuiLoading'
})
export default class VComponent extends Vue {
  text = 'sadgasd'

  // 为了支持服务端渲染，只能使用特定的生命周期勾子
  beforeCreate() {}

  created() {}
}
</script>
