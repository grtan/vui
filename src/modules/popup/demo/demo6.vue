<template>
  <div :class="$style.root">
    <vui-button type="gorgeous" hue="primary" @click="show = true">显示</vui-button>
    <vui-popup v-model="show" direction="up" :overlayer="true" :class="$style.wrapper" :close-on-click-overlayer="false">
      <div :class="$style.content">
        <div>popup-up</div>
        <VuiButton @click="show = false" type="gorgeous" hue="success" :block="true" :class="$style.close">关闭</VuiButton>
      </div>
    </vui-popup>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VuiPopup from '../index'
import VuiButton from '../../button/component.vue'
import VuiDialog from '../../dialog'


@Component({
  components: {
    VuiPopup,
    VuiButton
  }
})
export default class VComponent extends Vue {
  static title = '禁止点击蒙层关闭'
  show = false
}
</script>

<style lang="scss" src="../style/index.scss"></style>
<style lang="scss" module>
.root {
  display: flex;
  flex-direction: column;
}
.wrapper {
  width: 100%;
}
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
