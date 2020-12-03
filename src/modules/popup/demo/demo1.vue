<template>
  <div :class="$style.root">
    <vui-button type="gorgeous" hue="primary" @click="show = true">显示</vui-button>
    <vui-popup v-model="show" direction="down" :overlayer="true" :class="$style.wrapper">
      <div :class="$style.content">
        <div>popup-down</div>
        <VuiButton @click="show = false" type="gorgeous" hue="success" :block="true" :class="$style.close">关闭</VuiButton>
      </div>
    </vui-popup>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VuiPopup from '../index'
import VuiButton from '../../button/component.vue'


@Component({
  components: {
    VuiPopup,
    VuiButton
  }
})
export default class VComponent extends Vue {
  static title = '向下弹出'
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
