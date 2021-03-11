<template>
  <vui-video>xxxx</vui-video>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VuiVideo from '../component.vue'

@Component({
  components: {
    VuiVideo
  }
})
export default class VComponent extends Vue {
  static title = '样例1'
}
</script>
