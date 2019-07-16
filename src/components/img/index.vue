<template>
  <div :class="$options.name">
    <cutover v-bind="$attrs">
      <div :class="`${$options.name}-wrapper`" v-if="status==='loading'" key="loading">
        <slot name="loading">
          <img :class="`${$options.name}-default`" :src="loading" v-if="loading" />
        </slot>
      </div>
      <div :class="`${$options.name}-wrapper`" v-else-if="status==='error'" key="error">
        <slot name="error">
          <img :class="`${$options.name}-default`" :src="error" v-if="error" />
        </slot>
      </div>
      <img :class="`${$options.name}-wrapper`" :src="src" v-else />
    </cutover>
    <img :class="`${$options.name}-helper`" :src="src" @load="onLoad" @error="onError" />
  </div>
</template>

<style lang="less">
@import '../../assets/style/base';

@name: ~'@{lib-name}-img';
@cutover: ~'@{lib-name}-cutover';

.@{name} {
  display: inline-block;
  font-size: 0;
  line-height: 1;

  > .@{cutover} {
    height: 100%;
  }

  &-wrapper {
    height: 100%;
  }

  &-default {
    display: block;
    width: 100%;
    height: 100%;
  }

  &-helper {
    display: block;
    width: 0;
    height: 0;
  }
}
</style>

<script>
import { libName } from '../../config'
import Cutover from '../cutover/index.vue'

export default {
  name: `${libName}-img`,
  components: {
    Cutover
  },
  props: {
    src: {
      type: String,
      required: true
    },
    loading: String,
    error: String,
    delay: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      status: 'loading'
    }
  },
  watch: {
    src() {
      this.status = 'loading'
    }
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        this.status = 'success'
      }, this.delay)
    },
    onError() {
      setTimeout(() => {
        this.status = 'error'
      }, this.delay)
    }
  }
}
</script>
