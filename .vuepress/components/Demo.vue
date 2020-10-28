<template>
  <iframe
    :class="$style.iframe"
    :style="{ backgroundImage: `url(${$withBase('/images/phone.png')})` }"
    src="//localhost:8080"
  ></iframe>
</template>

<style module>
.iframe {
  position: fixed;
  z-index: 99999;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  box-sizing: border-box;
  padding: 89px 24px 93px;
  width: 341px;
  height: 705px;
  border: none;
  background: center / contain no-repeat;
  user-select: none;
}
</style>
