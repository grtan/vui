<template>
  <popup class="vui-dialog" v-bind="$attrs" v-on="$listeners" :value="value" :duration="duration" :click-close="false"
         @back="onBack">
    <div class="vui-dialog-box">
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
    <div class="vui-dialog-bottom"></div>
  </popup>
</template>

<script>
  import Popup from '../popup/index.vue'

  export default {
    name: 'vui-dialog',
    components: {
      Popup
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
      onBack () {
        this.$emit('btn-click', -1)
      }
    }
  }
</script>