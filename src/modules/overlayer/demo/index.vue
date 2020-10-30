<template>
  <div>
    <vui-overlayer v-slot="slotProps" v-model="show2" :push-state="true" :before-close="beforeClose">
      <div v-show="slotProps.show" class="box"></div>
    </vui-overlayer>
    <vui-overlayer v-slot="slotProps" v-model="show" appear :push-state="true">
      <button v-show="slotProps.show" @click="show2 = !show2">开关2</button>
    </vui-overlayer>
    <button @click="show = !show">开关</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Overlayer from '../index'

@Component({
  components: {
    VuiOverlayer: Overlayer
  }
})
export default class VComponent extends Vue {
  show = true
  show2 = false

  beforeClose(close: () => void) {
    setTimeout(close, 1000)
  }
}
</script>

<style lang="scss" src="../style/index.scss"></style>

<style lang="scss">
.box {
  background: #fff;
  bottom: 0;
  height: 100px;
  left: 0;
  margin: auto;
  position: fixed;
  right: 0;
  top: 0;
  width: 100px;
}
</style>
