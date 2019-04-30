# switch 开关

> switch是一个开关组件

## 使用方法

```
<vui-switch v-model="checked" :color="[color1,color2]" :disabled="disabled" :prevent="prevent"
            @change="change" @click="click"></vui-switch>
```

```
import {Switch} from 'vui';

export default {
    components: {
        VuiSwitch: Switch
    }
};
```

## 属性

名称|类型|必填|默认值|描述
:-:|:-:|:-:|:-:|:-:
v-model|`Boolean`|`Y`|`-`|是否选中
color|`Array`|`N`|`['#fff', '#456fff']`|切换时的颜色，第一个表示未选中时的背景色，第二个表示选中时的背景色
disabled|`Boolean`|`N`|`false`|是否禁用
prevent|`Boolean`|`N`|`false`|点击时是否阻止默认切换行为

## 事件

名称|参数|说明
:-:|:-:|:-:
change|`{value}`|切换时触发，value为切换后的值
click|`{value}`|未禁用的状态下点击时触发，value为点击时的当前值。通常当`prevent`为true时用来进行二次确认

## 更新日志

* v1.0.0 发布
