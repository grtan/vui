<template>
  <popup
    :class="$options.name"
    v-bind="$attrs"
    v-on="$listeners"
    :value="value"
    :duration="duration"
    :click-close="false"
    @back="onBack"
  >
    <div :class="`${$options.name}-box`">
      <div :class="`${$options.name}-title`" v-if="title">{{title}}</div>
      <div :class="`${$options.name}-content`">
        <slot></slot>
      </div>
      <div :class="`${$options.name}-footer`" v-if="btns.length">
        <template v-for="(text,index) in texts">
          <span v-if="index" :key="`span-${index}`"></span>
          <a :key="`a-${index}`" @click="$emit('btn-click',index)">{{text}}</a>
        </template>
      </div>
    </div>
    <div :class="`${$options.name}-bottom`"></div>
  </popup>
</template>

<script>
import { libName } from '../../config'
import Popup from '../popup/index.vue'
import translation from '../../mixins/translation'
import message from './lang/zh-CN'

export default {
  name: `${libName}-dialog`,
  components: {
    Popup
  },
  mixins: [translation],
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
        const texts = ['_取消_', '_确定_']

        texts._untranslated = true

        return texts
      }
    }
  },
  computed: {
    texts () {
      if (this.btns._untranslated && this.btns[0] === '_取消_' && this.btns[1] === '_确定_') {
        return [this.$t('cancel'), this.$t('ok')]
      }

      return this.btns
    }
  },
  methods: {
    onBack () {
      this.$emit('btn-click', -1)
    }
  },
  beforeCreate () {
    this.message = message
  }
}
</script>
