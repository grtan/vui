<template>
  <div>xxxx</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VuiHistoryAction from '../index'

Vue.use(VuiHistoryAction, {})

@Component
export default class VComponent extends Vue {}
</script>
