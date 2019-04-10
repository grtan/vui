<template>
  <div class="vui-navbar" :style="{background}">
    <div class="vui-navbar-left">
      <div>
        <slot name="left"></slot>
      </div>
    </div>
    <div class="vui-navbar-center">
      <slot></slot>
    </div>
    <div class="vui-navbar-right">
      <div>
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="less">
  .vui-navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-left, &-right {
      z-index: 1;
      width: 0;

      > div {
        float: left;
        writing-mode: horizontal-tb;
      }
    }

    &-right {
      writing-mode: vertical-rl;
    }

    &-center {
      flex-grow: 1;
      text-align: center;
    }
  }
</style>

<script>
  export default {
    name: 'vui-navbar',
    props: {
      background: { // 背景
        type: String,
        default: ''
      }
    }
  }
</script>