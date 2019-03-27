<template>
   <div class='share' id='share'>
     <div class="share-info">
       <p>标题：{{shareTitle}}</p>
       <p>子标题：{{shareSubTitle}}</p>
       <p>缩略图: </p>
       <img :src="shareImg">
       <p>分享链接：{{shareLink}}</p>
     </div>
     <div class="share-btn" @click="share">
       点我分享
     </div>
   </div>
</template>
<script>
import Utils from '@/utils'
export default {
  name: 'component_name',
  components: {

  },
  data () {
    return {
      shareTitle: document.title,
      shareSubTitle: '这里是Demo的子标题部分',
      shareImg: 'http://test-bj-ws.vivo.com.cn/SkGXL3khGlOSrIIB/wukong/img/4a9db3c0-07f2-11e9-abc9-f3d960102b9f.png',
      shareLink: 'https://www.vivo.com'
    }
  },
  methods: {
    share () {
      let support = Utils.app.supportShare()
      if (support) {
        let params = {
          title: this.shareTitle,
          weiTitle: this.shareSubTitle,
          weiImg: this.shareImg,
          weiLink: this.shareLink
        }
        Utils.app.doShare(params)
      } else {
        Utils.toast('当前环境暂不支持分享！')
      }
    }
  },
  mounted () {

  }
}
</script>
<style lang="less">
#share{
  box-sizing: border-box;
  padding: 50px;
  img{
    width: 60%;
  }
  .share-btn{
    margin: 50px auto;
    width: 400px;
    line-height: 100px;
    text-align: center;
    color: #fff;
    border-radius: 30px;
    background-color: #0087cd;
  }
}
</style>