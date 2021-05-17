<template>
  <vui-transition :class="$style.app" :type="$vui.historyAction === 'back' ? 'cover-back' : 'cover'">
    <router-view />
  </vui-transition>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VuiTransition from '../../src/modules/transition'

@Component({
  components: {
    VuiTransition
  }
})
export default class VComponent extends Vue {}
</script>

<style lang="scss" src="../../src/modules/transition/style/index.scss"></style>

<style lang="scss" module>
.app {
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 50px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  text-size-adjust: none;

  > * {
    background: #fff;
    display: block;
    height: 100%;
    overflow: auto;
    padding: 30px;
  }
}
</style>

<style lang="scss">
$transition-duration: 300ms;

html,
body {
  height: 100%;
}

body {
  background: #fff;
  margin: 0 auto;
  max-width: 1080px;
}

.demo {
  &__wrapper {
    margin-top: 100px;
  }

  &__title {
    font-size: 54px;
  }

  &__content {
    font-size: 40px;
    margin-top: 46px;
  }
}

.cover {
  &-enter {
    transform: translateX(100%);

    &-active {
      transition: transform $transition-duration;
    }
  }

  &-leave {
    &-active {
      transition: opacity $transition-duration;
    }

    &-to {
      opacity: 0 !important;
    }
  }

  &-back {
    &-enter {
      opacity: 0 !important;

      &-active {
        transition: opacity $transition-duration;
      }
    }

    &-leave {
      &-active {
        position: relative;
        transition: transform $transition-duration;
        z-index: 1;
      }

      &-to {
        transform: translateX(100%);
      }
    }
  }
}
</style>
