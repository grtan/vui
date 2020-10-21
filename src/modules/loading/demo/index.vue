<template>
  <vui-loading>xxxx</vui-loading>
</template>

<style lang="scss" src="../style/index.scss"></style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VuiLoading from '../index'

@Component({
  components: {
    VuiLoading
  }
})
export default class VComponent extends Vue {}
</script>
