<template>
  <iframe
    :class="$style.iframe"
    :style="{ backgroundImage: `url(${$withBase('/images/phone.png')})` }"
    :src="`//${location.hostname}:3003`"
  ></iframe>
</template>

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
