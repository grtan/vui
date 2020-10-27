<template>
  <span
    v-if="show"
    :class="[
      'vui-tag',
      {
        [`vui-tag--${type}`]: ['gorgeous', 'plain'].includes(type),
        [`vui-tag--${hue}`]: ['primary', 'success', 'fail'].includes(type),
        [`vui-tag--${size}`]: ['big', 'small', 'mini'].includes(type)
      }
    ]"
  >
    <slot></slot>
    <i v-if="closable" class="vui-tag__close" @click="onClose">X</i>
  </span>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { size } from '@/utils/store'

@Component({
  name: 'VuiTag'
})
export default class VComponent extends Vue {
  show = true

  // 类型
  @Prop({
    type: String,
    default: 'regular'
  })
  readonly type!: 'gorgeous' | 'plain' | 'regular'

  // 色调
  @Prop({
    type: String,
    default: 'regular'
  })
  readonly hue!: 'primary' | 'regular' | 'success' | 'fail'

  @Prop({
    type: String,
    default() {
      return size
    }
  })
  readonly size!: 'big' | 'regular' | 'small' | 'mini'

  @Prop({
    type: Boolean,
    default: false
  })
  readonly closable!: boolean

  onClose() {
    this.show = false
    this.$emit('close')
  }
}
</script>
