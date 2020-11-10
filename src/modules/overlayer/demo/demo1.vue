<template>
  <div :class="$style.root">
    <vui-overlayer v-slot="slotProps" v-model="show" :light="true">
      <div v-show="slotProps.show" :class="$style.content">点击蒙层区域或返回键关闭</div>
    </vui-overlayer>
    <vui-button type="gorgeous" hue="primary" @click="show = !show">{{ show ? '隐藏' : '显示' }}</vui-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VuiOverlayer from '../component.vue'
import VuiButton from '../../button/component.vue'

@Component({
  components: {
    VuiOverlayer,
    VuiButton
  }
})
export default class VComponent extends Vue {
  static title = '浅色遮罩层'
  show = false
}
</script>

<style lang="scss" module>
.root {
  align-items: center;
  display: flex;
  flex-direction: column;
}

.content {
  background: #333;
  color: #fff;
  font-size: 50px;
  left: 50%;
  padding: 100px;
  position: fixed;
  text-align: center;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
