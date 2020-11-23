<template>
  <span
    :class="[
      'vui-link',
      {
        [`vui-link--${vue}`]: ['primary', 'regular', 'success', 'fail'].includes(vue),
        [`vui-link--${size}`]: ['big', 'small', 'mini'].includes(size)
      }
    ]"
    :disabled="disabled"
    :href="href"
    :underline="underline"
    @click="!disabled && emit('click')"
  >
    <div v-if="icon && iconPosition === 'before'">icon</div>
    <slot></slot>
    <div v-if="icon && iconPosition === 'after'">icon</div>
  </span>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'VuiLink'
})
export default class VComponent extends Vue {
  // 色调
  @Prop({
    type: String,
    default: 'primary'
  })
  readonly vue!: 'primary' | 'regular' | 'success' | 'fail'

  // 下划线
  @Prop({
    type: Boolean,
    default: true
  })
  readonly underline!: boolean

  // 是否禁用
  @Prop({
    type: Boolean,
    default: false
  })
  readonly disabled!: boolean

  // 大小
  @Prop({
    type: String,
    default: 'regular'
  })
  readonly size!: 'big' | 'regular' | 'small' | 'mini'

  // 链接
  @Prop({
    type: String,
    default: ''
  })
  readonly href!: string

  // 图标名称
  @Prop({
    type: String,
    default: ''
  })
  readonly icon?: string

  // 图标位置
  @Prop({
    type: String,
    default: 'before'
  })
  readonly iconPosition!: 'before' | 'after'
}
</script>
