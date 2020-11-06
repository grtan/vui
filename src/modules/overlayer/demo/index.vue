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
import Demo3 from './demo3.vue'
import Demo4 from './demo4.vue'

@Component
export default class VComponent extends Vue {
  demos = [Demo0, Demo1, Demo2, Demo3, Demo4]
}
</script>

<style lang="scss" src="../style/index.scss"></style>
<style lang="scss" src="../../button/style/index.scss"></style>
<style lang="scss" src="../../dialog/style/index.scss"></style>
