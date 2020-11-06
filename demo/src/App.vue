<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
body {
  background: #fff;
  margin: 0;
}

/* stylelint-disable-next-line */
#app {
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 0.5rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-size-adjust: none;
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
</style>
