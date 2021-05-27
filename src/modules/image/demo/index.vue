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
import Demo5 from './demo5.vue'
import Demo6 from './demo6.vue'

@Component
export default class VComponent extends Vue {
  demos = [Demo0, Demo1, Demo2, Demo3, Demo4, Demo5, Demo6]
}
</script>

<style lang="scss" src="../style/index.scss"></style>
<style lang="scss">
$duration: 300ms;

.image-demo-fade-enter {
  &-active {
    opacity: 0.999;
    position: relative;
    transition: opacity $duration;
    z-index: -1;
  }
}

.image-demo-fade-leave {
  &-active {
    transition: opacity $duration;
  }

  &-to {
    opacity: 0;
  }
}

.image-demo-zoom-enter {
  &-active {
    opacity: 0.999;
    position: relative;
    transition: opacity $duration;
    z-index: -1;
  }
}

.image-demo-zoom-leave {
  &-active {
    transition: transform $duration, opacity $duration;
  }

  &-to {
    opacity: 0;
    transform: scale(0);
  }
}
</style>
