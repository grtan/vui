<template>
  <iframe
    :class="$style.iframe"
    :style="{ backgroundImage: `url(${$withBase('/images/phone.png')})` }"
    :src="src"
    @load="postMessage"
  ></iframe>
</template>

<script>
export default {
  data() {
    return {
      src: ''
    }
  },
  watch: {
    '$route.path': 'postMessage'
  },
  beforeMount() {
    this.src = `//${window.location.hostname}:3012`
  },
  methods: {
    postMessage() {
      let module = ''

      if (this.$route.path.startsWith('/src/modules/')) {
        module = this.$route.path.replace(/^\/src\/modules\/([^/]+).*$/, '$1')
      }

      this.$el.contentWindow.postMessage(
        {
          type: 'vui',
          module
        },
        '*'
      )
    }
  }
}
</script>

<style module>
.iframe {
  background: center / contain no-repeat;
  border: 0;
  box-sizing: border-box;
  height: 705px;
  padding: 89px 23px 93px;
  position: fixed;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  user-select: none;
  width: 341px;
  z-index: 99999;
}
</style>
