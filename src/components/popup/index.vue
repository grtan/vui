<template>
  <layer class="vui-popup" :class="[`vui-popup-${direction}`,{'vui-popup-layer':layer}]" :value="value"
         v-bind="$attrs" v-on="$listeners">
    <cutover :type="`popup-${direction}`" v-bind="$attrs">
      <div slot-scope="slot" :style="slot.styleObj" class="vui-popup-box" v-show="value">
        <slot></slot>
      </div>
    </cutover>
  </layer>
</template>

<style lang="less">
  @name: vui-popup;

  .@{name} {
    > div {
      visibility: hidden;
    }

    &-layer > div,
    > div > div {
      visibility: visible;
    }

    &-box {
      position: absolute;

      .@{name}-up & {
        left: 0;
        right: 0;
        bottom: 0;
      }

      .@{name}-down & {
        left: 0;
        right: 0;
        top: 0;
      }

      .@{name}-right & {
        left: 0;
        top: 0;
        bottom: 0;
      }

      .@{name}-left & {
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