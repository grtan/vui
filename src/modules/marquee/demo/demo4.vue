<template>
  <div>
    <vui-marquee :play="play"
      ><span :class="$style.highlight">万鸦老（Manado），别名美娜多</span
      >，是印度尼西亚北苏拉威西省首府，位于苏拉威西岛北端（北纬1度29分，东经124度50分），濒临苏拉威西海。万鸦老发展至今，是苏拉威西岛的第二大城市，人口近41.75万（2005年），共有9个市辖区，为群山所环绕，素以海岸美景著称。</vui-marquee
    >
    <vui-button size="mini" @click="play = !play">{{ play ? '暂停' : '播放' }}</vui-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VuiMarquee from '../component.vue'
import VuiButton from '../../button/component.vue'

@Component({
  components: {
    VuiMarquee,
    VuiButton
  }
})
export default class VComponent extends Vue {
  static title = '播放/暂停'
  private play = true
}
</script>

<style lang="scss" module>
.highlight {
  color: #f00;
}
</style>
