<template>
  <layer class="vui-dialog" :value="value" :click-close="false"
         :prevent-close="!autoClose" @back="onBack" v-bind="$attrs" v-on="$listeners">
    <div class="vui-dialog-box">
      <span class="vui-dialog-close" v-if="close" @click="onClose"></span>
      <p class="vui-dialog-title" v-if="title">{{title}}</p>
      <div class="vui-dialog-content">
        <slot></slot>
      </div>
      <div class="vui-dialog-footer" v-if="btns.length">
        <template v-for="(btn,index) in btns">
          <span :class="{[`vui-dialog-${btn.type}`]:btn.type}"
                :style="{width:`${btns.length>1?90/btns.length:100}%`}"
                @click="$emit('btn-click',index)">{{btn.text}}</span>
          {{' '}}
        </template>
      </div>
    </div>
  </layer>
</template>

<script>
  import Layer from '../layer/index.vue'

  export default {
    name: 'vui-dialog',
    components: {
      Layer
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      close: { // 右上角是否有关闭按钮
        type: Boolean,
        default: false
      },
      autoClose: { // 点击关闭按钮或者后退是否自动关闭
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: ''
      },
      btns: {
        type: Array,
        default () {
          return [{
            text: '取消'
          }, {
            text: '确定',
            type: 'primary' // 主按钮，颜色不一样
          }]
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