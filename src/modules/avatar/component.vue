<template>
  <div
    :class="[
      'vui-avatar',
      {
        [`vui-avatar--${type}`]: ['circle'].includes(type),
        [`vui-avatar--${size}`]: ['big', 'small', 'mini'].includes(size),
        'vui-avatar--text': !src
      }
    ]"
  >
    <img v-if="src" class="vui-avatar__img" :style="{ 'object-fit': fit }" :src="src" />
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
    type: String,
    default: ''
  })
  src!: string

  @Prop({
    type: String,
    default: 'cover'
  })
  fit!: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
}
</script>
