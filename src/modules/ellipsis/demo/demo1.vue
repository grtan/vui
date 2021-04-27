<template>
  <vui-ellipsis :class="$style.root" :max-line="3">
    马尔代夫共和国（The Republic of Maldives，原名马尔代夫群岛 [1]
    ），简称“马尔代夫”(Maldives)，印度洋上的群岛国家。距离印度南部约600公里，距离斯里兰卡西南部约750公里。26组自然环礁、1192个珊瑚岛分布在9万平方公里的海域内，其中约200个岛屿有人居住。
    [2] 陆地面积298平方公里，是亚洲最小的国家。
    <div slot="ellipsis">...</div>
  </vui-ellipsis>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VuiEllipsis from '../component.vue'

@Component({
  components: {
    VuiEllipsis
  }
})
export default class VComponent extends Vue {
  static title = '多行打点'
}
</script>

<style lang="scss" module>
.root {
  text-align: justify;
}
</style>
