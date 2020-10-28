<template>
  <vui-loading>xxxx</vui-loading>
</template>

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

<style lang="scss" src="../style/index.scss"></style>
