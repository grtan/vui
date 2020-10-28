<template>
  <div>
    <vui-avatar src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" size="big"
      >xxxx</vui-avatar
    >
    <vui-avatar size="big" type="circle">xxxx</vui-avatar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VuiAvatar from '../index'

@Component({
  components: {
    VuiAvatar
  }
})
export default class VComponent extends Vue {}
</script>

<style lang="scss" src="../style/index.scss"></style>
