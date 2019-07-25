<template>
  <div :class="$options.name">
    <cutover
      v-bind="$attrs"
      v-__img_lazyload="lazy&&{type:'expose',options:lazy===true?undefined:lazy}"
      @track_expose.native="onExpose"
    >
      <div v-if="status==='loading'" key="loading" :class="`${$options.name}-wrapper`">
        <slot name="loading">
          <img v-if="loading" :class="`${$options.name}-default`" :src="loading" />
        </slot>
      </div>
      <div v-else-if="status==='error'" key="error" :class="`${$options.name}-wrapper`">
        <slot name="error">
          <img v-if="error" :class="`${$options.name}-default`" :src="error" />
        </slot>
      </div>
      <img v-else :class="`${$options.name}-wrapper`" :src="src" />
    </cutover>
    <img
      v-if="showHelper"
      :class="`${$options.name}-helper`"
      :src="src"
      @load="onLoad"
      @error="onError"
    />
  </div>
</template>

<style lang="less">
@import "../../assets/style/base";

@name: ~"@{lib-name}-img";
@cutover: ~"@{lib-name}-cutover";

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
import { Track } from '../../plugins/track/index'

let directiveInit
const directiveName = '__img_lazyload'

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
    },
    lazy: {
      // 是否懒加载
      type: [Boolean, Object],
      default: false
    }
  },
  data () {
    return {
      status: 'loading',
      expose: false // 是否曝光过
    }
  },
  computed: {
    showHelper () {
      // 是否显示隐藏的img元素
      return !this.lazy || this.expose
    }
  },
  watch: {
    src () {
      this.status = 'loading'

      if (this.lazy) {
        this.expose = this.currentIsExpose
      }
    }
  },
  beforeCreate () {
    // 初始化指令
    if (!directiveInit) {
      directiveInit = true
      this.constructor.use(new Track(), {
        name: directiveName
      })
    }
  },
  methods: {
    onLoad () {
      setTimeout(() => {
        this.status = 'success'
      }, this.delay)
    },
    onError () {
      setTimeout(() => {
        this.status = 'error'
      }, this.delay)
    },
    onExpose ({ detail: { directive, expose } }) {
      // 懒加载指令触发的事件
      if (directive === directiveName) {
        if (expose) {
          this.expose = true
        }

        // 当前是否为曝光的状态，这里不同步设置this.expose，是为了防止图片还未加载完时把img元素remove，从而中断图片加载
        this.currentIsExpose = expose
      }
    }
  }
}
</script>
