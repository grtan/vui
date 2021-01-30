<template>
  <div>
    <vui-button type="gorgeous" hue="primary" @click="index = 0">显示</vui-button>
    <vui-image-previewer v-model="index" :list="list"></vui-image-previewer>
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
  static title = '无缩略图'

  index = -1
  list = [
    {
      src: 'https://shopstatic.vivo.com.cn/vivoshop/commodity/25/10002225_1608884553180_750x750.png.webp',
      title: '这是一段<strong>描述文本</strong>'
    },
    {
      // msrc: 'https://farm4.staticflickr.com/3894/15008518202_b016d7d289_m.jpg',
      src: 'https://farm4.staticflickr.com/3894/15008518202_c265dfa55f_h.jpg'
      // w: 1600,
      // h: 1600
    },
    {
      // msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
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
      src: 'https://farm4.staticflickr.com/3920/15008465772_d50c8f0531_h.jpg',
      w: 1600,
      h: 1066
    },
    {
      src: 'https://goss1.cfp.cn/creative/vcg/800/new/VCG211310796397xx.jpeg',
      w: 800,
      h: 540
    }
  ]

  created() {
    // 动态添加图片
    setTimeout(() => {
      this.list.push(
        {
          msrc: 'https://farm3.staticflickr.com/2567/5697107145_3c27ff3cd1_m.jpg',
          src: 'https://farm3.staticflickr.com/2567/5697107145_a4c2eaa0cd_o.jpg',
          w: 1024,
          h: 1024
        },
        {
          msrc: 'https://farm7.staticflickr.com/6175/6176698785_7dee72237e_m.jpg',
          src: 'https://farm7.staticflickr.com/6175/6176698785_7dee72237e_b.jpg',
          w: 1024,
          h: 683
        }
      )
    }, 5000)
  }
}
</script>
