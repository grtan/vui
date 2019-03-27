<template>
  <div class='error-page' v-if="error.show">
    <div>
      <img class="imgBox" src="~@/assets/error.png" alt="" v-webp>
      <div class="text">
        <div>{{error.msg}}</div>
      </div>
      <div class="btns">
        <div class="btn" @click.stop="skipIndex">
          返回首页
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'error',
  props: ['error'],
  methods: {

    skipIndex () {
      // 如果是跳转首页则重新刷新
       if (this.$route.name == 'Index') {
         location.reload()
       } else {
         this.$router.replace('/')
       }
    }
  },
  mounted () {
    var msg = qs.parse(window.location.href.split('?')[1]).msg
    this.msg = msg || this.$store.state.error.msg
  }
}
</script>
<style lang="less">
.error-page {
  display: flex;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  height: 100%;
  text-align: center;
  background: #fff;
  z-index: 2147483647;
  .imgBox {
    margin: 0 auto;
    width: 355px;
    height: 237px;
  }
  .text {
    margin-top: 35px;
    font-size: 42px;
    color: #999999;
  }
  .btns {
    margin-top: 80px;
  }
  .btns .btn {
    display: inline-block;
    margin-bottom: 20px;
    width: 320px;
    height: 98px;
    line-height: 98px;
    color: #fff;
    background: rgb(10, 136, 240);
    border-radius: 3px;
    letter-spacing: 1px;
  }
}
</style>
