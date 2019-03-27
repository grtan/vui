<template>
  <ol id="index" class="unselect">
    <!-- <li
      v-for="(item,index) in fns"
      :key="index"
    >
      <div
        @click="item.path"
        class="item"
      >{{item.name}}</div>
    </li>-->
    <li class="item" @click="getOpen">获取OpenId</li>
    <li class="item" @click="login">登陆</li>
    <li class="item" @click="supportShare">是否支持分享</li>
    <li class="item" @click="doShare">分享</li>
    <li class="item" @click="copy">拷贝文本</li>
    <li
      class="item"
      @click="openVivoNativeURL('game','http://passport.vivo.com.cn')"
    >获取打开游戏中心客户端的webview地址</li>
    <li
      class="item"
      @click="openVivoNativeURL('space','http://passport.vivo.com.cn')"
    >获取打开官网客户端的webview地址</li>
    <li
      class="item"
      @click="openVivoNativeURL('store','http://passport.vivo.com.cn')"
    >获取打开商店客户端的webview地址</li>
    <input type="text">
  </ol>

  <!-- <div
    @click="getOpenId"
    class="item"
  >获取OpenId</div>-->
</template>
<script>
import Utils from '@/utils/app.js'
export default {
  data () {
    return {

    }
  },
  created () {
    // let aaa = Utils.getOpenId()
    // alert(aaa)
  },
  mounted () {

  },
  methods: {
    getOpen () {
      alert(Utils.getOpenId())
    },
    login () {
      Utils.login({})
    },
    supportShare () {
      var result = Utils.supportShare()
      if (result) {
        alert('支持')
      } else {
        alert('不支持')
      }
    },
    doShare () {
      Utils.doShare({
        title: '微信',
        weiTitle: '微信',
        weiImg: 'jak8',
        weiLink: 'http://passport.vivo.com.cn'
      })
    },
    copy () {
      alert('asjkdask')
      Utils.copy('asjkdask')
    },
    openVivoNativeURL (nativeType, url) {
      Utils.openVivoNativeURL(nativeType, url)
    },
    callClient (funName, data) {
      Utils.callClient()
    }
  }

}
</script>
<style lang="less">
#index {
  display: flex;
  flex-direction: column;
  color: #06304b;
  // height: 3000px;
  // justify-content: center;
  align-items: center;
  li {
    width: 100%;
    list-style-type: decimal;
    padding-left: 1.3rem;
    height: 1.5rem;
    line-height: 1.5rem;
    border-bottom: 1px solid #dedede;
    .item {
      color: #333;
      height: 100%;
      width: 100%;
      display: -webkit-box;
      -webkit-box-align: center;
      position: relative;
      &::before {
        content: ">";
        position: absolute;
        right: 1rem;
        top: 0.3rem;
      }
    }
  }
}
</style>
