# dialog 淡入淡出

> dialog是一个对话框组件

## 使用方法

```
<button @click="show=true">显示</button>
<vivo-dialog :close="true" title="这是标题" v-model="show" @btn-click="btnClick">
    这是内容
</vivo-dialog>

```

```
import {Dialog as VDialog} from 'vui';

export default {
    components: {
        VDialog
    },
    data: {
        show: false
    },
    methods: {
        btnClick(type) {
            console.log(type);
            this.show = false;
        }
    }
};
```

## 属性

名称|类型|必填|默认值|描述
:-:|:-:|:-:|:-:|:-:
v-model|`Boolean`|`Y`|`-`|是否显示对话框
close|`Boolean`|`N`|`false`|是否显示右上角的关闭按钮
autoClose|`Boolean`|`N`|`true`|点击右上角的关闭按钮或者后退时，是否自动关闭对话框
title|`String`|`N`|`-`|标题，没有则不显示
btns|`Array`|`N`|`[{text: '取消'}, {text: '确定',type: 'primary'}]`|按钮列表
btns[{text}]|`String`|`Y`|`-`|按钮文本
btns[{type}]|`String`|`N`|`-`|按钮类型，只支持`primary`，表示主按钮，默认为普通按钮

## 插槽

名称|必填|说明
:-:|:-:|:-:
默认|`Y`|内容区域

## 事件

名称|参数|说明
:-:|:-:|:-:
btn-click|{type}|点击按钮或者后退时触发，点击右上角关闭按钮或者后退时type为-1（**autoClose为true时一样触发**），点击底部按钮时从左至右依次为0，1，2...

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