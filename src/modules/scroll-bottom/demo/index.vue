<template>
  <div v-vui-test="">xxxx</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VuiTest from '../index'

@Component({
  directives: {
    VuiTest
  }
})
export default class VComponent extends Vue {}
</script>
