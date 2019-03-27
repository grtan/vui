<template>
  <div class="loading" v-show="loading">
    <div class="pacman">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'loading',
  props: ['loading']
}
</script>
<style lang="less">
.loading {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  font-size: 0.42rem;
  color: #aaa;
  text-align: center;
  z-index: 99999;
  background: rgba(255, 255, 255, 0.5);
}

.pacman {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 1.2rem;
  width: 2.88rem;
  transform: translate(-50%, -50%);
  overflow: hidden;
}

.pacman > div:first-of-type,
.pacman > div:nth-child(2) {
  position: absolute;
  width: 0;
  height: 0;
  border-right: 0.54rem solid transparent;
  border-top: 0.54rem solid #59a4dd;
  border-left: 0.54rem solid #59a4dd;
  border-bottom: 0.54rem solid #59a4dd;
  border-radius: 0.54rem;
  z-index: 10;
}

.pacman > div:nth-child(3) {
  animation: pacman-balls 1.2s 0.4s infinite linear;
  background-color: #6fe4ca;
}

.pacman > div:nth-child(4) {
  animation: pacman-balls 1.2s 0.8s infinite linear;
  background-color: #8ac4ff;
}

.pacman > div:nth-child(5) {
  animation: pacman-balls 1.2s 1.2s infinite linear;
  background-color: #ffc171;
}

.pacman > div:first-of-type {
  animation: rotate_pacman_half_up 0.4s 0s infinite;
}

.pacman > div:nth-child(2) {
  animation: rotate_pacman_half_down 0.4s 0s infinite;
}

.pacman > div:nth-child(3),
.pacman > div:nth-child(4),
.pacman > div:nth-child(5),
.pacman > div:nth-child(6) {
  border-radius: 100%;
  margin: 0.06rem;
  width: 0.3rem;
  height: 0.3rem;
  position: absolute;
  transform: translate(0, -0.1875rem);
  top: 0.54rem;
  left: 2.4rem;
}

@keyframes rotate_pacman_half_up {
  0%,
  100% {
    transform: rotate(270deg);
  }
  50% {
    transform: rotate(360deg);
  }
}

@keyframes rotate_pacman_half_down {
  0%,
  100% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(0);
  }
}

@keyframes pacman-balls {
  75% {
    opacity: 0.7;
  }
  100% {
    transform: translate(-1.89rem, -0.1875rem);
  }
}
</style>