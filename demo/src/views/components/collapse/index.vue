<template>
  <div class="collapse-demo">
    <collapse>
      <collapse-panel :header="'品牌宣言'">
        <p>
          追求乐趣、充满活力、年轻时尚。人，一直以来都是我们最根本的灵感之源。
          秉持着敢于追求极致，持续创造惊喜的品牌精神，vivo将持续不断地为消费者打造拥有卓越外观和畅快体验的专业智能手机。
        </p>
      </collapse-panel>
      <collapse-panel>
        <span slot="header">
          <strong>Camera</strong>
        </span>
        <div>秉承“科技理解人”的理念，vivo基于拍照领域多年的经验以及技术积累，在镜头、元件、补光、智能算法等技术上不断研发突破，为消费者提供充满艺术感的拍照效果和优质的拍照体验。</div>
      </collapse-panel>
      <collapse-panel header="Music">
        <p>音乐不仅仅是技术的体现，更是我们对于人们生活方式的理解。作为业界早期将HI-FI级别音质引入智能手机的品牌，vivo不断为消费者持续提供优异的听觉体验。</p>
      </collapse-panel>
    </collapse>
  </div>
</template>

<script>
  import { Collapse,CollapsePanel } from 'vui'
export default {
  components: { Collapse, CollapsePanel },
  data () {
    return {}
  },
  methods: {
    onChange (data) {
      console.log(data)
    }
  }
}
</script>

<style>
.collapse-demo {
  padding: 10px;
}
</style>
