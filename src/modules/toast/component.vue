<template>
  <vui-transition :class="['vui-toast', className]" appear>
    <div v-if="visible && allowHtml" class="vui-toast__content" v-html="content"></div>
    <div v-else-if="visible" class="vui-toast__content">{{ content }}</div>
  </vui-transition>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VuiTransition from '../transition'

@Component({
  name: 'VuiToast',
  components: {
    VuiTransition
  }
})
export default class VComponent extends Vue {
  timeoutId?: number
  visible = false
  content = ''
  allowHtml = false
  className = ''

  show(
    content: string,
    { duration, allowHtml, className }: { duration?: number; allowHtml?: boolean; className?: string } = {}
  ) {
    clearTimeout(this.timeoutId)
    this.content = content
    this.allowHtml = !!allowHtml
    this.className = className || ''
    this.visible = true
    this.timeoutId = window.setTimeout(() => {
      this.visible = false
    }, duration || 3000)
  }

  mounted() {
    document.body.appendChild(this.$el)
  }
}
</script>
