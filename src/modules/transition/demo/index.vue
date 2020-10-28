<template>
  <div>
    <button @click="show = !show">开关</button>
    <vui-transition type="fade" appear>
      <div v-if="show" key="box1" :class="$style.box"></div>
      <div v-else key="box2" :class="$style.box2"></div>
    </vui-transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VuiTransition from '../index'

@Component({
  components: {
    VuiTransition
  }
})
export default class VComponent extends Vue {
  show = false
}
</script>

<style lang="scss" src="../style/index.scss"></style>
<style lang="scss" module>
.box {
  // width: 200px;
  height: 200px;
  background: red;
}

.box2 {
  // width: 200px;
  height: 200px;
  background: black;
}
</style>
