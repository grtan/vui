<template>
  <vui-button type="plain" corner="round" hue="primary" size="">按</vui-button>
</template>

<style lang="scss" src="../style/index.scss"></style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Button from '../index'

@Component({
  components: {
    VuiButton: Button
  }
})
export default class VComponent extends Vue {}
</script>
