<template>
  <div class="vui-loading">
    <div class="vui-loading__icon">icon</div>
    <div class="vui-loading__text"><slot></slot></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'VuiLoading'
})
export default class VComponent extends Vue {
  text = 'sadgasd'
}
</script>
