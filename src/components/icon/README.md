# icon 图标

> icon是一个图标组件

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
            type: 'e66c',
            disabled: false
        }
    }
};
```

## 属性

名称|类型|必填|默认值|描述
:-:|:-:|:-:|:-:|:-:
type|`String`|`Y`|`-`|图标类型，因为采用的字体图标，所以`type`为16进制的unicode编码字符串，如`e66c`、`e66d`之类的
disabled|`Boolean`|`N`|`false`|是否已被禁用

## 事件

名称|参数|说明
:-:|:-:|:-:
click|`-`|非禁用状态下，点击图标会触发该事件
