<template>
  <div class="home">

    <divider>1.XButton</divider>
    <x-button type="primary" action-type="button">submit</x-button>
    <x-button type="warn" action-type="reset">reset</x-button>
    <div class="reference">
      参考文档：
      <a href="https://doc.vux.li/zh-CN/components/x-button.html" target="_blank">https://doc.vux.li/zh-CN/components/x-button.html</a>
    </div>

    <divider>2.Alert</divider>
    <XButton type="primary" @click.native="showAlertDialog">showAlert</XButton>
    <alert v-model="showAlert" title="Alert" content="'Alert弹出框'"></alert>
    <div class="reference">
      参考文档：
      <a href="https://doc.vux.li/zh-CN/components/alert.html" target="_blank">https://doc.vux.li/zh-CN/components/alert.html</a>
    </div>

    <divider>3.Toast</divider>
    <toast v-model="showToast" :position="position" type='text'>我显示啦</toast>
    <XButton type="primary" @click.native="showToastDialog('top')">showToast-top</XButton>
    <XButton type="primary" @click.native="showToastDialog('middle')">showToast-middle</XButton>
    <XButton type="primary" @click.native="showToastDialog('bottom')">showToast-bottom</XButton>
    <div class="reference">
      参考文档：
      <a href="https://doc.vux.li/zh-CN/components/toast.html" target="_blank">https://doc.vux.li/zh-CN/components/toast.html</a>
    </div>

    <divider>4.XInput</divider>
    <group>
      <x-input title="title" v-model="value"></x-input>
    </group>
    <group title="is-type传入function">
      <x-input title="必须输入2333" :is-type="be2333" placeholder="I'm placeholder"></x-input>
    </group>
    <div class="reference">
      参考文档：
      <a href="https://doc.vux.li/zh-CN/components/x-input.html" target="_blank">https://doc.vux.li/zh-CN/components/x-input.html</a>
    </div>

    <divider>5.XTextarea</divider>
    <group :title="'used with input'">
      <x-input :placeholder="'title'"></x-input>
      <x-textarea :max="200" name="description" :placeholder="'placeholder'"></x-textarea>
    </group>
    <div class="reference">
      参考文档：
      <a href="https://doc.vux.li/zh-CN/components/x-textarea.html" target="_blank">https://doc.vux.li/zh-CN/components/x-textarea.html</a>
    </div>

    <divider>6.Calendar</divider>
    <group>
      <calendar title="title" v-model="valuec"></calendar>
    </group>
    <div class="reference">
      参考文档：
      <a href="https://doc.vux.li/zh-CN/components/calendar.html" target="_blank">https://doc.vux.li/zh-CN/components/calendar.html</a>
    </div>

    <divider>7.Picker</divider>
    <picker :data='years' v-model='year1' @on-change='change'></picker>
    <div class="reference">
      参考文档：
      <a href="https://doc.vux.li/zh-CN/components/picker.html" target="_blank">https://doc.vux.li/zh-CN/components/picker.html</a>
    </div>

    <divider>8.PopupPicker</divider>
    <group>
      <popup-picker :title="title4" :data="list3" :columns="3" v-model="value4" show-name></popup-picker>
    </group>
    <div class="reference">
      参考文档：
      <a href="https://doc.vux.li/zh-CN/components/popup-picker.html" target="_blank">https://doc.vux.li/zh-CN/components/popup-picker.html</a>
    </div>

    <divider>9.XAddress</divider>
    <group>
      <x-address @on-hide="logHide" @on-show="logShow" :title="title_xaddress" v-model="value_xaddress" :list="addressData" @on-shadow-change="onShadowChange" placeholder="请选择地址" inline-desc="可以设置placeholder" :show.sync="showAddress"></x-address>
      <cell title="上面value值" :value="value_xaddress"></cell>
    </group>
    <div class="reference">
      参考文档：
      <a href="https://doc.vux.li/zh-CN/components/x-address.html" target="_blank">https://doc.vux.li/zh-CN/components/x-address.html</a>
    </div>

    <divider>10.XNumber</divider>
    <group>
      <x-number title="x-number-test" v-model="xnumbervalue"></x-number>
    </group>
    <div class="reference">
      参考文档：
      <a href="https://doc.vux.li/zh-CN/components/x-number.html" target="_blank">https://doc.vux.li/zh-CN/components/x-number.html</a>
    </div>

    <divider>11.InlineXNumber</divider>
    <group>
      <cell title="inline-x-number">
        <inline-x-number style="display:block;" :min="0" width="50px" button-style="round"></inline-x-number>
      </cell>
    </group>
    <div class="reference">
      参考文档：
      <a href="https://doc.vux.li/zh-CN/components/inline-x-number.html" target="_blank">https://doc.vux.li/zh-CN/components/inline-x-number.html</a>
    </div>

    <divider>12.XSwitch & XDialog</divider>
    <group>
      <x-switch v-model="showHideOnBlur" :title="'点击遮罩自动关闭'"></x-switch>
    </group>
    <div>
      <x-dialog v-model="showHideOnBlur" class="dialog-demo" hide-on-blur>
        <div class="img-box">
          <img src="https://ws1.sinaimg.cn/large/663d3650gy1fq6824ur1dj20ia0pydlm.jpg" style="max-width:100%">
        </div>
        <div @click="showHideOnBlur=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
    <div class="reference">
      参考文档：
      <a href="https://doc.vux.li/zh-CN/components/x-dialog.html" target="_blank">https://doc.vux.li/zh-CN/components/x-dialog.html</a>
    </div>

    <divider>13.ButtonTab & ButtonTabItem</divider>
    <button-tab v-model="demo01">
      <button-tab-item @on-item-click="consoleIndex()">11111</button-tab-item>
      <button-tab-item @on-item-click="consoleIndex()">22222</button-tab-item>
    </button-tab>
    <div class="reference">
      参考文档：
      <a href="https://doc.vux.li/zh-CN/components/button-tab.html" target="_blank">https://doc.vux.li/zh-CN/components/button-tab.html</a>
    </div>

    <divider>14.Tab & TabItem</divider>
    <tab bar-active-color="#668599" :line-width="1">
      <tab-item>已发货</tab-item>
      <tab-item selected>未发货</tab-item>
      <tab-item>全部订单</tab-item>
      <tab-item>全部订单</tab-item>
      <tab-item>全部订单</tab-item>
    </tab>
    <div class="reference">
      参考文档：
      <a href="https://doc.vux.li/zh-CN/components/tab.html" target="_blank">https://doc.vux.li/zh-CN/components/tab.html</a>
    </div>

    <divider>15.1px</divider>
    <div style="border: 1px solid #C7C7C7;padding:10px;margin:10px;">普通设置1px</div>

    <div style="padding:10px;margin:10px;" class="vux-1px">
      vivo-ui 1px
      <pre style="text-align: left;">
使用CSS样式：
通过设置伪元素宽度与高度放大到200%,
transform-origin设置原点为左上角，
在使用transform: scale(0.5)缩放一半。

样式如下
content: " ";
position: absolute;
left: 0;
top: 0;
width: 200%;
border: 1px solid #c7c7c7;
color: #c7c7c7;
height: 200%;
transform-origin: left top;
transform: scale(0.5);

直接在dom加上一下样式即可：
vux-1px-l 左边框
vux-1px-r 右边框
vux-1px-t 上边框
vux-1px-b 下边框
vux-1px-tb 上下边框
vux-1px 全边框
      </pre>
    </div>

    <divider>16.tab & swiper</divider>
    <div>
      <tab :line-width=2 active-color='#fc378c' v-model="index">
        <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
      </tab>
      <swiper v-model="index" height="100px" :show-dots="false">
        <swiper-item v-for="(item, index) in list2" :key="index">
          <div class="tab-swiper vux-center">{{item}} Container</div>
        </swiper-item>
      </swiper>
    </div>

  </div>
</template>

<script>
import Utils from '@/utils'
import { Toast, Alert, XButton, XInput, Group, ChinaAddressV4Data, Calendar, Picker, PopupPicker, Cell, XAddress, XTextarea, XNumber, InlineXNumber, XSwitch, XDialog, ButtonTab, ButtonTabItem, Tab, TabItem, Divider, Swiper, SwiperItem } from '@vivo/vivo-ui'

const list = () => ['精选', '美食', '电影', '酒店', '外卖']
let years = []
for (var i = 2000; i <= 2030; i++) {
  years.push({
    name: i + '年',
    value: i + ''
  })
}
export default {
  name: 'home',
  components: {
    Alert,
    XButton,
    Toast,
    XInput,
    Group,
    Calendar,
    Picker,
    PopupPicker,
    Cell,
    XAddress,
    XTextarea,
    XNumber,
    InlineXNumber,
    XSwitch,
    XDialog,
    ButtonTab,
    ButtonTabItem,
    Tab,
    TabItem,
    Divider,
    Swiper,
    SwiperItem
  },
  data () {
    return {
      list2: list(),
      demo2: '美食',
      index: 0,
      showHideOnBlur: false,
      showToast: false,
      position: 'top',
      showAlert: false,
      value: 'test-input',
      title: 'hahha',
      be2333: function (value) {
        return {
          valid: value === '2333',
          msg: 'Must be 2333'
        }
      },
      valuec: 'TODAY',
      years: [years],
      year1: [''],
      title4: '联动显示文字',
      list3: [{
        name: '中国',
        value: 'china',
        parent: 0
      }, {
        name: '美国',
        value: 'USA',
        parent: 0
      }, {
        name: '广东',
        value: 'china001',
        parent: 'china'
      }, {
        name: '广西',
        value: 'china002',
        parent: 'china'
      }, {
        name: '美国001',
        value: 'usa001',
        parent: 'USA'
      }, {
        name: '美国002',
        value: 'usa002',
        parent: 'USA'
      }, {
        name: '广州',
        value: 'gz',
        parent: 'china001'
      }, {
        name: '深圳',
        value: 'sz',
        parent: 'china001'
      }, {
        name: '广西001',
        value: 'gx001',
        parent: 'china002'
      }, {
        name: '广西002',
        value: 'gx002',
        parent: 'china002'
      }, {
        name: '美国001_001',
        value: '0003',
        parent: 'usa001'
      }, {
        name: '美国001_002',
        value: '0004',
        parent: 'usa001'
      }, {
        name: '美国002_001',
        value: '0005',
        parent: 'usa002'
      }, {
        name: '美国002_002',
        value: '0006',
        parent: 'usa002'
      }],
      value4: [],
      title_xaddress: 'xaddress',
      value_xaddress: [],
      addressData: ChinaAddressV4Data,
      showAddress: false,
      xnumbervalue: 7,
      demo01: 0
    }
  },
  methods: {
    consoleIndex () {
      console.log('click demo01', this.demo01)
    },
    logHide (str) {
      console.log('on-hide', str)
    },
    logShow (str) {
      console.log('on-show')
    },
    onShadowChange (ids, names) {
      console.log(ids, names)
    },
    showToastDialog (position) {
      this.position = position
      this.showToast = true
    },
    showAlertDialog () {
      this.showAlert = true
    },
    change (value) {
      console.log('new Value', value)
    }
  },
  mounted () {
    Utils.toast('show Toast')
  }
}
</script>

<style lang="less">
@import '~@vivo/vivo-ui/src/styles/close.less';
@import '~@vivo/vivo-ui/src/styles/1px.less';
@import '~@vivo/vivo-ui/src/styles/center.less';
.vux-divider {
  color: #42b983;
  font-size: 0.8rem;
}
.home {
  .reference {
    text-align: left;
    word-break: break-all;
    margin: 10px 0 10px 0;
  }
}
.tab-swiper {
  background-color: #fff;
  height: 100px;
}
// .dialog-demo {
//   .weui-dialog {
//     border-radius: 8px;
//     padding-bottom: 8px;
//   }
//   .dialog-title {
//     line-height: 30px;
//     color: #666;
//   }
//   .img-box {
//     height: 350px;
//     overflow: hidden;
//   }
//   .vux-close {
//     margin-top: 8px;
//     margin-bottom: 8px;
//   }
// }
</style>