<template>
  <div></div>
</template>

<style lang="scss" src="../style/index.scss"></style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Toast from '../index'

@Component
export default class VComponent extends Vue {
  created() {
    Toast('发生大噶<em>大国家党s</em>傻大个', {
      allowHtml: true
    })

    setTimeout(() => {
      Toast('发生大噶<em>大国家党s</em>傻大个', {
        allowHtml: false
      })
    }, 1000)
  }
}
</script>
