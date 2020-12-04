<template>
  <div>
    <div>当前historyAction: {{ $vui.historyAction }}</div>
    <div :class="$style.prompt">
      如果当前展示的值为replace，并不是出现了错误。当demo跟随文档菜单点击切换时，就是使用的replace，如果直接操作demo，其值就不一样。
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class VComponent extends Vue {}
</script>

<style lang="scss" module>
.prompt {
  font-weight: 500;
  margin-top: 1em;
}
</style>
