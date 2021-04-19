<template>
  <vui-ellipsis :class="$style.root" :max-line="4" :collapse="collapse">
    马尔代夫共和国（The Republic of Maldives，原名马尔代夫群岛 [1] ）<img
      src="http://www.7jiaqi.com/Upload/%E5%B2%9B%E5%B1%BF%E5%9B%BE%E7%89%87/ozen/%E9%A3%8E%E6%99%AF%E5%9B%BE/%E9%A3%8E%E6%99%AF%E5%A4%B4%E5%9B%BE.jpg"
    />，简称<span :class="$style.highlight">“马尔代夫”</span
    >，印度洋上的群岛国家。距离印度南部约600公里，距离斯里兰卡西南部约750公里。26组自然环礁、1192个珊瑚岛分布在9万平方公里的海域内，其中约200个岛屿有人居住。
    [2] 陆地面积298平方公里，是亚洲最小的国家。
    <div slot="ellipsis" :class="$style.ellipsis">
      <div v-if="collapse">...<span @click="collapse = false">展开</span></div>
      <span v-else @click="collapse = true">收起</span>
    </div>
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
  static title = '自定义打点内容'

  collapse = true
}
</script>

<style lang="scss" module>
.root {
  text-align: justify;

  img {
    height: 1.5em;
    vertical-align: bottom;
    width: 2.9em;
  }
}

.highlight {
  color: #f00;
}

.ellipsis {
  span {
    color: #f00;
    float: right;
    margin-left: 1em;
  }
}
</style>
