<template>
  <div :class="$style.root">
    <vui-button type="gorgeous" hue="primary" @click="show = true">显示</vui-button>
    <vui-popup v-model="show" position="right">
      <div :class="$style.content">
        <div :class="$style.text">popup-left</div>
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

@Component({
  components: {
    VuiPopup,
    VuiButton
  }
})
export default class VComponent extends Vue {
  static title = '右侧弹出'
  show = false
}
</script>

<style lang="scss" module>
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
