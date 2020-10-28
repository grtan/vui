<template>
  <div>
    <div class="line">
      <vui-button type="" hue="" size="" corner="" :block="false" :disabled="false">按钮</vui-button>
      <vui-button type="" hue="primary" size="" corner="" :block="false" :disabled="false">按钮</vui-button>
      <vui-button type="" hue="success" size="" corner="" :block="false" :disabled="false">按钮</vui-button>
      <vui-button type="" hue="fail" size="" corner="" :block="false" :disabled="false">按钮</vui-button>
      <vui-button type="" hue="warning" size="" corner="" :block="false" :disabled="false">按钮</vui-button>
    </div>
    <div class="line">
      <vui-button type="gorgeous" hue="" size="" corner="" :block="false" :disabled="false">按钮</vui-button>
      <vui-button type="gorgeous" hue="primary" size="" corner="" :block="false" :disabled="false">按钮</vui-button>
      <vui-button type="gorgeous" hue="success" size="" corner="" :block="false" :disabled="false">按钮</vui-button>
      <vui-button type="gorgeous" hue="fail" size="" corner="" :block="false" :disabled="false">按钮</vui-button>
      <vui-button type="gorgeous" hue="warning" size="" corner="" :block="false" :disabled="false">按钮</vui-button>
    </div>
    <div class="line">
      <vui-button type="plain" hue="" size="" corner="" :block="false" :disabled="false">按钮</vui-button>
      <vui-button type="plain" hue="primary" size="" corner="" :block="false" :disabled="false">按钮</vui-button>
      <vui-button type="plain" hue="success" size="" corner="" :block="false" :disabled="false">按钮</vui-button>
      <vui-button type="plain" hue="fail" size="" corner="" :block="false" :disabled="false">按钮</vui-button>
      <vui-button type="plain" hue="warning" size="" corner="" :block="false" :disabled="false">按钮</vui-button>
    </div>
    <div class="line">
      <vui-button type="gradient" hue="" size="" corner="" :block="false" :disabled="false">按钮</vui-button>
      <vui-button type="gradient" hue="primary" size="" corner="" :block="false" :disabled="false">按钮</vui-button>
      <vui-button type="gradient" hue="success" size="" corner="" :block="false" :disabled="false">按钮</vui-button>
      <vui-button type="gradient" hue="fail" size="" corner="" :block="false" :disabled="false">按钮</vui-button>
      <vui-button type="gradient" hue="warning" size="" corner="" :block="false" :disabled="false">按钮</vui-button>
    </div>
    <div class="line">
      <vui-button type="text" hue="" size="" corner="" :block="false" :disabled="false">按钮</vui-button>
      <vui-button type="text" hue="primary" size="" corner="" :block="false" :disabled="false">按钮</vui-button>
      <vui-button type="text" hue="success" size="" corner="" :block="false" :disabled="false">按钮</vui-button>
      <vui-button type="text" hue="fail" size="" corner="" :block="false" :disabled="false">按钮</vui-button>
      <vui-button type="text" hue="warning" size="" corner="" :block="false" :disabled="false">按钮</vui-button>
    </div>

    <div class="line">
      <vui-button type="gradient" hue="" size="" corner="" :block="false" :disabled="true">按钮</vui-button>
      <vui-button type="gradient" hue="primary" size="" corner="" :block="false" :disabled="true">按钮</vui-button>
      <vui-button type="gradient" hue="success" size="" corner="" :block="false" :disabled="true">按钮</vui-button>
      <vui-button type="gradient" hue="fail" size="" corner="" :block="false" :disabled="true">按钮</vui-button>
      <vui-button type="gradient" hue="warning" size="" corner="" :block="false" :disabled="true">按钮</vui-button>
    </div>

    <div class="line">
      <vui-button type="gradient" hue="" size="big" corner="round">按钮</vui-button>
      <vui-button type="gradient" hue="" size="" corner="round">按钮</vui-button>
      <vui-button type="gradient" hue="" size="small" corner="round">按钮</vui-button>
      <vui-button type="gradient" hue="" size="mini" corner="round">按钮</vui-button>
    </div>

    <div class="line">
      <vui-button type="gorgeous" hue="" size="big" corner="circle">按</vui-button>
      <vui-button type="gorgeous" hue="" size="" corner="circle">按</vui-button>
      <vui-button type="gorgeous" hue="" size="small" corner="circle">钮</vui-button>
      <vui-button type="gorgeous" hue="" size="mini" corner="circle">钮</vui-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Button from '../index'

@Component({
  components: {
    VuiButton: Button
  }
})
export default class VComponent extends Vue {}
</script>

<style lang="scss" src="../style/index.scss"></style>
