<template>
  <div :class="$style.root">
    <vui-button type="gorgeous" hue="primary" @click="onShow">显示</vui-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VuiDialog from '../index'
import VuiButton from '../../button/component.vue'

@Component({
  components: {
    VuiButton
  }
})
export default class VComponent extends Vue {
  static title = 'alert方法'

  onShow() {
    VuiDialog.alert({
      title: '泡温泉',
      content:
        '冰岛是全世界天然温泉最多的国度之一，冰岛人更是把泡温泉搞成了全民休闲。温泉水温暖舒适，对皮肤还有许多好处（你有没有发现，冰岛人的皮肤都非常好？）。冰岛除了天然温泉，还有温泉泳池，遍布全国各地。家家户户的冰岛人每周都至少会去泳池泡一次，所以泳池更是社交的重要场所，来冰岛泡澡，没准就能认识个冰岛朋友呢。'
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
</style>
