<template>
  <div>{{ text }}</div>
</template>

<style lang="scss">
.test {
  content: 'res';
  width: 0.5px;

  @test {
    color: red;
  }
}
</style>

<script lang="ts">
export default {
  name: 'Dialog',
  data() {
    return {
      text: '123'
    }
  },
  async created() {
    await new Promise(resolve => {
      resolve(22)
    })
  },
  methods: {
    heh(str: string) {
      return ''
    }
  }
}
</script>
