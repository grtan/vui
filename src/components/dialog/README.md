# dialog 对话框

> dialog是一个对话框组件

## 使用方法

```
<vui-dialog v-model="show" :title="title" @btn-click="onBtnClick">
  内容内容
</vui-dialog>

```

```
import {Dialog as VuiDialog} from 'vui';

export default {
    components: {
        VuiDialog
    },
    ...
};
```

## 属性

名称|类型|必填|默认值|描述
:-:|:-:|:-:|:-:|:-:
v-model|`Boolean`|`Y`|`-`|是否显示对话框
preventClose|`Boolean`|`N`|`false`|点击关闭按钮或者back时是否阻止关闭
duration|`Number`|`N`|`285`|过渡时间，单位`ms`
close|`Boolean`|`N`|`false`|是否显示关闭按钮
title|`String`|`N`|`-`|标题，没有则不显示
btns|`Array`|`N`|`['取消', '确定']`|按钮文本列表

## 插槽

名称|必填|说明
:-:|:-:|:-:
默认|`Y`|内容区域

## 事件

名称|参数|说明
:-:|:-:|:-:
btn-click|{type}|点击按钮或者后退时触发，点击右上角关闭按钮或者back时type为-1（**preventClose为true时一样触发**），点击底部按钮时从左至右依次为0，1，2...

> dialog还支持插件形式来使用

```
import {PDialog} from 'vui';

Vue.use(PDialog);
//使用PDialog插件后，每个vue组件实例都可以显示和关闭对话框
this.$vui.dialog.show({
    close: true,    //是否显示对话框，默认false
    autoClose: true,
    title: '标题',    //标题，没有则不显示
    btns: [{text: '确定',type:'primary'}],    //按钮，默认值跟组件一样
    className: 'my-dialiog',    //自定义类名
    slot: '<em>正文内容</em>',   //正文内容
    callback(type, close) {     //点击按钮的回调
        //type跟组件形式一样
        close();    //关闭
    }
});
//关闭所有dialog
this.$vui.dialog.hide();
```

## 注意

**如果需要在vue组件外使用dialog，可以使用Vue.$vui.dialog.show()和Vue.$vui.dialog.hide()**