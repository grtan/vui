<template>
  <layer class="vui-loading" v-model="show" :background="background" :vui-layer="layer" :click-close="false"
         :back-close="false" v-bind="$attrs">
    <div class="vui-loading-content">
      <slot>
        <div class="vui-loading-default"></div>
      </slot>
    </div>
  </layer>
</template>

<script>
  import Layer from '../layer/index.vue'

  export default {
    name: 'vui-loading',
    components: {
      Layer
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      layer: { // 是否显示遮罩层
        type: Boolean,
        default: true
      },
      background: {
        type: String,
        default: '#fff'
      }
    }
  }
</script>