<template>
  <button :class="['vui-button', ...classNames]">
    <div v-if="icon && iconPosition === 'before'">icon</div>
    <slot></slot>
    <div v-if="icon && iconPosition === 'after'">icon</div>
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { size } from '@/utils/config'

@Component({
  name: 'VuiButton'
})
export default class VComponent extends Vue {
  @Prop({
    default: 'regular'
  })
  readonly type!: 'gorgeous' | 'plain' | 'gradient' | 'text' | 'regular'

  // 色调
  @Prop({
    default: 'regular'
  })
  readonly hue!: 'primary' | 'regular' | 'success' | 'fail' | 'warning'

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

  @Prop({
    default: false
  })
  readonly disabled!: boolean

  @Prop(String)
  readonly icon?: boolean

  @Prop({
    default: 'before'
  })
  readonly iconPosition!: 'before' | 'after'

  get classNames() {
    const blockClassName = 'vui-button'
    const classNames: string[] = []

    ;[this.type, this.hue, this.size, this.corner].forEach(prop => {
      if (prop !== 'regular') {
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
