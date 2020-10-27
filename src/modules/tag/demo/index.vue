<template>
  <vui-tag type="gorgeous" hue="primary" size :closable="true">xxxx</vui-tag>
</template>

<style lang="scss" src="../style/index.scss"></style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VuiTag from '../index'

@Component({
  components: {
    VuiTag
  }
})
export default class VComponent extends Vue {}
</script>
