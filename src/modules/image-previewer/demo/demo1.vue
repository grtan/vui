<template>
  <div>
    <vui-image-previewer v-model="index" :list="list" :get-thumbnail="getThumbnail"></vui-image-previewer>
    <div :class="$style.list">
      <img v-for="(item, i) in list" :key="i" ref="item" :class="$style.item" :src="item.msrc" @click="index = i" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VuiImagePreviewer from '../component.vue'
import VuiButton from '../../button/component.vue'

@Component({
  components: {
    VuiImagePreviewer,
    VuiButton
  }
})
export default class VComponent extends Vue {
  static title = '有缩略图'

  index = -1
  list = [
    {
      msrc: 'https://farm4.staticflickr.com/3894/15008518202_b016d7d289_m.jpg',
      src: 'https://farm4.staticflickr.com/3894/15008518202_c265dfa55f_h.jpg',
      title: '这是一段<strong>描述文本</strong>'
    },
    {
      msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
      src: 'https://farm6.staticflickr.com/5591/15008867125_b61960af01_h.jpg',
      w: 1600,
      h: 1068
    },
    {
      msrc: 'https://farm6.staticflickr.com/5584/14985868676_4b802b932a_m.jpg',
      src: 'https://farm6.staticflickr.com/5584/14985868676_b51baa4071_h.jpg',
      w: 1600,
      h: 1066
    },
    {
      msrc: 'https://farm4.staticflickr.com/3920/15008465772_d50c8f0531_h.jpg',
      src: 'https://farm4.staticflickr.com/3920/15008465772_d50c8f0531_h.jpg',
      w: 1600,
      h: 1066
    },
    {
      msrc: 'https://goss1.cfp.cn/creative/vcg/800/new/VCG211310796397.jpeg',
      src: 'https://goss1.cfp.cn/creative/vcg/800/new/VCG211310796397.jpeg',
      w: 800,
      h: 540
    }
  ]

  getThumbnail(index: number) {
    return (this.$refs.item as any)[index]
  }
}
</script>

<style lang="scss" module>
.list {
  align-items: flex-end;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
}

.item {
  cursor: zoom-in;
  height: 200px;
  margin: 100px 400px;
  width: 200px;
}
</style>
