<template>
  <button :class="['vui-button', ...classNames]" :disabled="disabled" @click="!disabled&&$emit('click')">
    <div v-if="icon && iconPosition === 'before'">icon</div>
    <slot></slot>
    <div v-if="icon && iconPosition === 'after'">icon</div>
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { size } from '@/utils/store'

@Component({
  name: 'VuiButton'
})
export default class VComponent extends Vue {
  // 按钮类型
  @Prop({
    default: 'regular'
  })
  readonly type!: 'gorgeous' | 'plain' | 'gradient' | 'text' | 'regular'

  // 色调
  @Prop({
    default: 'regular'
  })
  readonly hue!: 'primary' | 'regular' | 'success' | 'fail'

  @Prop({
    default() {
      return size
    }
  })
  readonly size!: 'big' | 'regular' | 'small' | 'mini'

  @Prop({
    default: 'regular'
  })
  readonly corner!: 'regular' | 'round' | 'circle'

  // 是内联小按钮还是块按钮
  @Prop({
    default: false
  })
  readonly block!: boolean

  // 禁用
  @Prop({
    default: false
  })
  readonly disabled!: boolean

  // 图标名称
  @Prop(String)
  readonly icon?: string

  // 图标位置
  @Prop({
    default: 'before'
  })
  readonly iconPosition!: 'before' | 'after'

  get classNames() {
    const blockClassName = 'vui-button'
    const classNames: string[] = []

    ;[this.type, this.hue, this.size, this.corner].forEach(prop => {
      if (prop && prop !== 'regular') {
        classNames.push(`${blockClassName}--${prop}`)
      }
    })

    if (this.block) {
      classNames.push(`${blockClassName}--block`)
    }

    if (this.disabled) {
      classNames.push(`${blockClassName}--disabled`)
    }

    return classNames
  }
}
</script>
