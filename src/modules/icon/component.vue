<template>
  <svg class="vui-icon" aria-hidden="true" :data-disabled="disabled">
    <!-- xlink:href已废弃，为了兼容部分浏览器而加上 -->
    <use :xlink:href="`#vui-icon-${name}`" :href="`#vui-icon-${name}`" />
  </svg>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'VuiIcon'
})
export default class VComponent extends Vue {
  // 图标名称
  @Prop({
    type: String,
    required: true
  })
  readonly name!: string

  // 是否禁用
  @Prop({
    type: Boolean,
    default: false
  })
  readonly disabled!: boolean
}
</script>
