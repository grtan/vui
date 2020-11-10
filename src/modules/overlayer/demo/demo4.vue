<template>
  <div :class="$style.root">
    <vui-overlayer v-slot="slotProps" v-model="show" :push-state="false" :before-close="onBeforeClose">
      <div v-show="slotProps.show" :class="$style.content">点击蒙层关闭</div>
    </vui-overlayer>
    <vui-button type="gorgeous" hue="primary" @click="show = !show">{{ show ? '隐藏' : '显示' }}</vui-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VuiOverlayer from '../component.vue'
import VuiButton from '../../button/component.vue'
import VuiDialog from '../../dialog'

@Component({
  components: {
    VuiOverlayer,
    VuiButton
  }
})
export default class VComponent extends Vue {
  static title = 'beforeClose'
  show = false

  onBeforeClose(closeDialog: (close?: boolean) => void) {
    VuiDialog.confirm({
      title: '是否关闭蒙层',
      content: '',
      pushState: false,
      beforeClose(action, close) {
        close()
        closeDialog(action === 'confirm')
      }
    })
  }
}
</script>

<style lang="scss" module>
.root {
  align-items: center;
  display: flex;
  flex-direction: column;
}

.content {
  background: #999;
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
