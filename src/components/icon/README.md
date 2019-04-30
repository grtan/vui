# icon 图标

> icon是一个图标组件，采用的`iconfont`方案，可自定义颜色和尺寸。

## 使用方法

```
<icon :type="type" :disabled="disabled" @click="onClick"></icon>
```

```
import {Icon} from 'vui';

export default {
    components: {
        Icon
    },
    data () {
        return {
            type: 'search',
            disabled: false
        }
    }
};
```

## 属性

名称|类型|必填|默认值|描述
:-:|:-:|:-:|:-:|:-:
type|`String`|`N`|`-`|图标类型名称，比如`good`、`search`等
unicode|`String`|`N`|`-`|图标的16进制的unicode编码字符串，如`e66c`、`e66d`之类的。如果需要使用自定义字体图标，可以设置该属性
disabled|`Boolean`|`N`|`false`|是否已被禁用

**因为图标库使用的`iconfont`实现的，所以可以随意改变大小和颜色**

## 事件

名称|参数|说明
:-:|:-:|:-:
click|`-`|非禁用状态下，点击图标会触发该事件

## 更新日志

* v1.0.0 发布
