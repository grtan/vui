<template>
  <div class="hello">
    <swipeout
      :style="{ fontWeight: 500 }"
      @on-open="onOpen"
      @on-close="onClose"
      :threshold="0.4"
      ref="swipeoutone"
    >
      <div slot="left-button">
        <swipeout-button @on-click="onClick" :auto-close="false" :type="'success'">收藏</swipeout-button>
        <swipeout-button :type="'delete'">删除</swipeout-button>
        <swipeout-button :type="'gray'">忽略</swipeout-button>
      </div>
      <div slot="right-button">
        <swipeout-button>收藏</swipeout-button>
        <swipeout-button :type="'delete'">删除</swipeout-button>
      </div>
      <div class="test">vui-swipeout</div>
    </swipeout>
    <swipeout :style="{ fontWeight: 500 }" :disabled="disabled" ref="swipeouttewo">
      <div slot="left-button">
        <swipeout-button @on-click="onClick" :auto-close="false" :type="'info'">收藏</swipeout-button>
        <swipeout-button :type="'delete'">删除</swipeout-button>
        <swipeout-button :type="'gray'">忽略</swipeout-button>
      </div>
      <div slot="right-button">
        <swipeout-button :type="'warning'">收藏</swipeout-button>
        <swipeout-button :type="'delete'">删除</swipeout-button>
      </div>
      <div class="test">{{disabled?"不可操作":"可操作"}}</div>
    </swipeout>
    <div class="btn" @click="toggle">切换设置({{disabled?"不可操作":"可操作"}})</div>
    <div class="btn" @click="open('left')">打开左侧</div>
    <div class="btn" @click="open('right')">打开右侧</div>
    <div class="btn" @click="close">关闭</div>
  </div>
</template>

<script>
  import { Swipeout,SwipeoutButton } from 'vui'

export default {
  components: { Swipeout, SwipeoutButton },
  data () {
    return {
      disabled: false
    }
  },
  methods: {
    toggle () {
      this.disabled = !this.disabled
      console.log(this.disabled)
    },
    open (position) {
      this.$refs.swipeouttewo.open(position)
    },
    close () {
      this.$refs.swipeouttewo.close()
    },
    onOpen () {
      console.log('打开了')
    },
    onClose () {
      console.log('关闭了')
    },
    onClick () {
      if (confirm('确认删除？')) {
        this.$refs.swipeoutone.close()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-box-sizing: border-box;
    box-sizing: border-box
}

article,aside,audio,body,dd,div,dl,footer,form,h1,h2,h3,h4,h5,h6,header,iframe,input,label,menu,nav,ol,p,section,select,td,textarea,th,time,ul,video {
    margin: 0;
    padding: 0;
    font-size: 100%
}

body,html {
    height: 100%;
    line-height: inherit
}

#root {
    min-height: 100%;
    height: inherit
}

body {
    font-family: Helvetica Neue,Helvetica,Arial,PingFang SC,Hiragino Sans GB,Heiti SC,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    font-size: 14px;
    background: #f9f9f9
}

.test {
  padding: 10PX;
  border-bottom: #eee 1PX solid;
}

.vui-swipeout-button {
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  text-align: center;
  justify-content: center;
  -webkit-justify-content: center;
}
.btn {
  width: 100%;
  height: 32PX;
  text-align: center;
  line-height: 32PX;
  background: rgb(51, 109, 214);
  color: #fff;
  margin-top: 10PX;
}
</style>
