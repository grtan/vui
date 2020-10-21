<template>
  <div :class="['vui-avatar', `vui-avatar--${type}`, `vui-avatar--${size}`]">
    <img v-if="src" class="vui-avatar__img" :src="src" :style="{ 'object-fit': fit }" />
    <slot v-else></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'VuiAvatar'
})
export default class VComponent extends Vue {
  @Prop({
    type: String,
    default: 'square'
  })
  type!: 'square' | 'circle'

  @Prop({
    type: String,
    default: 'regular'
  })
  size!: 'big' | 'regular' | 'small' | 'mini'

  @Prop({
    type: String
  })
  src!: string

  @Prop({
    type: String,
    default: 'cover'
  })
  fit!: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
}
</script>
