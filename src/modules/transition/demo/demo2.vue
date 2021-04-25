<template>
  <div :class="$style.root">
    <vui-transition :class="$style.wrapper" type="popup-bottom">
      <div v-show="show" :class="$style.content">popup-bottom</div>
    </vui-transition>
    <vui-button type="gorgeous" hue="primary" @click="show = !show">{{ show ? '隐藏' : '显示' }}</vui-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VuiTransition from '../component.vue'
import VuiButton from '../../button/component.vue'

@Component({
  components: {
    VuiTransition,
    VuiButton
  }
})
export default class VComponent extends Vue {
  static title = '底部弹出'
  show = true
}
</script>

<style lang="scss" module>
.root {
  align-items: center;
  display: flex;
  flex-direction: column;
}

.wrapper {
  height: 300px;
  margin-bottom: 30px;
  overflow: hidden;
  width: 100%;
}

.content {
  align-items: center;
  background: #f2f2f2;
  display: flex;
  height: 100%;
  justify-content: center;
}
</style>
