<template>
  <div :class="$style.root">
    <vui-button type="gorgeous" hue="primary" @click="show = true">显示</vui-button>
    <vui-popup v-model="show" :before-close="onBeforeClose">
      <div :class="$style.content">
        <div>popup-up</div>
        <VuiButton type="gorgeous" hue="success" :block="true" :class="$style.close" @click="show = false"
          >关闭</VuiButton
        >
      </div>
    </vui-popup>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VuiPopup from '../component.vue'
import VuiButton from '../../button/component.vue'
import VuiDialog from '../../dialog'

@Component({
  components: {
    VuiPopup,
    VuiButton
  }
})
export default class VComponent extends Vue {
  static title = 'beforeClose'
  show = false
  onBeforeClose(closeDialog: (close?: boolean) => void) {
    VuiDialog.confirm({
      title: '是否退出弹层',
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
.content {
  align-items: center;
  background: #f2f2f2;
  display: flex;
  flex-direction: column;
  font-size: 70px;
  height: 300px;
  justify-content: center;
  padding: 40px;
}
.close {
  margin-top: 40px;
}
</style>
