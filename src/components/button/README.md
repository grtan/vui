# button 蒙层

> button是一个按钮组件

## 使用方法

```
<vui-button :type="type" :shape="shape" :inline="inline" :disabled="disabled" @click="onClick">
    我是按钮
</vui-button>
```

```
import {Button} from 'vui';

export default {
    components: {
        VuiButton: Button
    }
};
```

## 属性

名称|类型|必填|默认值|描述
:-:|:-:|:-:|:-:|:-:
type|`String`|`N`|`default`|按钮类型，支持`default`、`primary`和`danger`三种类型
shape|`String`|`N`|`semicircle`|圆角形状，支持`semicircle`、`round`和`rectangle`三种类型
inline|`Boolean`|`N`|`false`|是否是内联小按钮
disabled|`Boolean`|`N`|`false`|是否已被禁用

## 插槽

名称|必填|说明
:-:|:-:|:-:
默认|`Y`|内容，可以添加图标等内容

## 事件

名称|参数|说明
:-:|:-:|:-:
click|`-`|非禁用状态下，点击按钮会触发该事件

## 更新日志

* v1.0.0 发布
