<template>
  <transition :duration="duration">
    <div class="vui-dialog" v-show="value">
      <layer :value="value" :duration="duration" v-bind="$attrs" v-on="$listeners" :click-close="false"
             @back="onBack"></layer>
      <cutover type="dialog" :duration="duration" v-bind="$attrs">
        <div class="vui-dialog-box" slot-scope="slot" :style="slot.styleObj" v-show="value">
          <icon v-if="close" type="e66c" @click="onClose"></icon>
          <div class="vui-dialog-title" v-if="title">{{title}}</div>
          <div class="vui-dialog-content">
            <slot></slot>
          </div>
          <div class="vui-dialog-footer" v-if="btns.length">
            <template v-for="(text,index) in btns">
              <span v-if="index"></span>
              <a @click="$emit('btn-click',index)">{{text}}</a>
            </template>
          </div>
        </div>
      </cutover>
    </div>
  </transition>
</template>

<script>
  import Layer from '../layer/index.vue'
  import Cutover from '../cutover/index.vue'
  import Icon from '../icon/index.vue'

  export default {
    name: 'vui-dialog',
    components: {
      Layer,
      Cutover,
      Icon
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      duration: {
        type: Number,
        default: 285
      },
      close: { // 右上角是否有关闭按钮
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      },
      btns: {
        type: Array,
        default () {
          return ['取消', '确定']
        }
      }
    },
    methods: {
      onClose () {
        window.history.back()
      },
      onBack () {
        this.$emit('btn-click', -1)
      }
    }
  }
</script>