# toast 提示

> toast是一个提示组件，支持自定义内容

## 使用方法

```
import {Toast} from 'vui';

export default {
    components: {
        Toast
    },
    methods: {
        show() {
            //调用toast组件的show方法
            this.$refs.toast.show();
        }
    }
};
```

```
<button @click="show">显示</button>
<toast ref="toast" :time="3000" position="bottom">
    <!--可插入任何内容-->
    toast内容
</toast>
```

## 属性

名称|类型|必填|默认值|描述
:-:|:-:|:-:|:-:|:-:
time|`Number`|`N`|`3000`|显示时间，单位ms
position|`String`|`N`|`center`|toast显示位置，只支持`top`,`center`,`bottom`三个值
single|`Boolean`|`N`|`true`|是否同时只能显示一个toast，如果为`true`，则显示toast时，show方法无效
className|`String`|`N`|`vui-toast-box`|自定义类名

## 插槽

名称|必填|说明
:-:|:-:|:-:
默认|`Y`|内容区域

> toast还支持插件形式来使用，可配置的属性和组件形式一样

```
import {PToast} from 'vui';

Vue.use(PToast);
//使用PToast插件后，每个vue组件实例都可以显示和关闭toast
this.$vui.toast.show({
    slot: '<span>这里可以写任何html</span>',   //toast内容
    time: 4000,     //显示时间
    position: 'bottom'  //位置
});
//关闭所有toast
this.$vui.toast.hide();
```

## 注意

**如果需要在vue组件外使用toast，也可以使用Vue.$vui.toast.show()和Vue.$vui.toast.hide()**
