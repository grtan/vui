<template>
  <div class="vui-popup" :vui-direction="direction">
    <layer :value="layer&&value" v-bind="$attrs" v-on="$listeners">
    </layer>
    <cutover :type="`popup-${direction}`" v-bind="$attrs">
      <div class="vui-popup-box" v-show="value">
        <slot></slot>
      </div>
    </cutover>
  </div>
</template>

<style lang="less">
  @import "../../assets/style/base";

  @name: ~"@{lib-name}-popup";
  @direction: ~"@{lib-name}-direction";

  .@{name} {
    &-box {
      position: fixed;
      z-index: 1000;

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