<template>
  <div :class="$options.name">
    <slot></slot>
  </div>
</template>

<script>
import { libName } from '../../config'

export default {
  name: `${libName}-swiper-item`
}
</script>
