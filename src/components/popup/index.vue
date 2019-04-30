<template>
  <!--这个layer来实现能否使用global属性，即决定蒙层范围-->
  <layer class="vui-popup" :vui-direction="direction" :value="value" background="transparent" :click-close="false"
         :back-close="false" v-bind="$attrs">
    <!--这个layer来实现蒙层-->
    <layer class="vui-popup-layer" :value="layer&&value" :global="true" v-bind="$attrs" v-on="$listeners"></layer>
    <cutover :type="`popup-${direction}`" v-bind="$attrs">
      <div class="vui-popup-box" v-show="value">
        <slot></slot>
      </div>
    </cutover>
  </layer>
</template>

<style lang="less">
  @import "../../assets/style/base";

  @name: ~"@{lib-name}-popup";
  @direction: ~"@{lib-name}-direction";

  .@{name} {
    > div {
      opacity: 1 !important;
    }

    &-layer > div {
      position: absolute !important;
      z-index: auto !important;
    }

    &-box {
      position: absolute;
      width: auto;

      .@{name}[@{direction}=up] & {
        left: 0;
        right: 0;
        bottom: 0;
      }

      .@{name}[@{direction}=down] & {
        left: 0;
        right: 0;
        top: 0;
      }

      .@{name}[@{direction}=right] & {
        left: 0;
        top: 0;
        bottom: 0;
      }

      .@{name}[@{direction}=left] & {
        right: 0;
        top: 0;
        bottom: 0;
      }
    }
  }
</style>

<script>
  import Layer from '../layer/index.vue'
  import Cutover from '../cutover/index.vue'

  export default {
    name: 'vui-popup',
    components: {
      Layer,
      Cutover
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      direction: { // 方向
        type: String,
        default: 'up',
        validator (value) {
          return ['up', 'down', 'left', 'right'].indexOf(value) !== -1
        }
      },
      layer: { // 是否有遮罩层
        type: Boolean,
        default: true
      }
    }
  }
</script>