<template>
  <vui-image :class="$style.root" :src="src" :delay="1000" :lazy="true" type="image-demo-fade">
    <template #loading>
      <div :class="$style.loading" @click="load">
        <img :class="$style.thumb" :src="thumb" />
        <div :class="$style.mask"></div>
        <div :class="$style.size">{{ size }}</div>
        <div v-if="!loading" :class="$style.text">GIF</div>
        <vue-loading v-else type="spin" color="#fff"></vue-loading>
      </div>
    </template>
    <template #error>
      <div :class="$style.error">图片加载失败~</div>
    </template>
  </vui-image>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { VueLoading } from 'vue-loading-template'
import VuiImage from '../component'
import info from './image/test.gif?info'
import thumb from './image/test.gif?thumb&inline'

@Component({
  components: {
    VuiImage,
    VueLoading
  }
})
export default class VComponent extends Vue {
  static title = 'gif图点击加载'
  src = ''
  size = `${(info.bytes / 1024).toFixed(2)}kb`
  thumb = thumb
  loading = false

  load() {
    this.loading = true
    this.src = info.src
  }
}
</script>

<style lang="scss" module>
.root {
  height: 500px;
  width: 100%;
}

.loading {
  color: #fff;
  height: 100%;
  position: relative;

  :global(.vue-loading) {
    height: 100px !important;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100px !important;
  }
}

.thumb {
  display: block;
  height: 100%;
  width: 100%;
}

.mask {
  background: rgba(0, 0, 0, 0.3);
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}

.size {
  line-height: 2;
  padding: 0 0.5em;
  position: absolute;
  right: 0;
  top: 0;
}

.text {
  border: 5px solid #fff;
  border-radius: 50%;
  font-weight: bolder;
  left: 50%;
  line-height: 3em;
  position: absolute;
  text-align: center;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 3em;
}

.error {
  align-items: center;
  background: rgb(252, 105, 105);
  display: flex;
  height: 100%;
  justify-content: center;
}
</style>
