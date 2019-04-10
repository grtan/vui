<template>
  <div :class="$style.root">
    <navbar background="#ad9">
      <template slot="left">left</template>
      <template>title</template>
      <template slot="right">rightright</template>
    </navbar>
    <navbar background="#ad9">
      <template slot="left">left<br>left</template>
      <template>title</template>
    </navbar>
    <navbar background="#ad9">
      <template>title</template>
      <template slot="right">right</template>
    </navbar>
    <navbar background="#ad9">
      <template slot="left">left</template>
    </navbar>
    <navbar background="#ad9">
      <template>title</template>
    </navbar>
    <navbar background="#ad9">
      <template slot="right">right</template>
    </navbar>
  </div>
</template>

<style module>
  .root > div {
    margin-top: .3rem;
  }
</style>

<script>
  import { Navbar } from 'vui'

  export default {
    components: {
      Navbar
    }
  }
</script>
