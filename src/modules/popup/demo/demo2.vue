<template>
  <div :class="$style.root">
    <vui-button type="gorgeous" hue="primary" @click="show = true">显示</vui-button>
    <vui-popup v-model="show" direction="right" :overlayer="true" :class="$style.wrapper">
      <div :class="$style.content">
        <div :class="$style.text">popup-right</div>
        <VuiButton type="gorgeous" hue="success" :block="true" :class="$style.close" @click="show = false"
          >关闭</VuiButton
        >
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
  static title = '向右弹出'
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
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font-size: 70px;
  height: 100%;
  justify-content: center;
  padding: 40px;
}
.text {
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
}
</style>
