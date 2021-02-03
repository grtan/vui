<template>
  <div class="demo">
    <div v-for="(demo, index) in demos" :key="index" class="demo__wrapper">
      <div class="demo__title">{{ demo.title }}</div>
      <div class="demo__content">
        <component :is="demo"></component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Demo0 from './demo0.vue'
import Demo1 from './demo1.vue'
import Demo2 from './demo2.vue'

// 加载image目录下的svg文件
const requireAll = (requireContext: any) => requireContext.keys().map(requireContext)
const req = (require as any).context('../image', false, /\.svg$/)
requireAll(req)

@Component
export default class VComponent extends Vue {
  demos = [Demo0, Demo1, Demo2]
}
</script>

<style lang="scss" src="../style/index.scss"></style>
