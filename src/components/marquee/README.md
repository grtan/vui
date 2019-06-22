# marquee 跑马灯

> marquee是一个跑马灯组件

## 使用方法

```
<marquee>这里是滚动内容，可以是任意内容</marquee>
```

```
import {Marquee} from 'vui';

export default {
    components: {
        Marquee
    }
};
```

## 属性

名称|类型|必填|默认值|描述
:-:|:-:|:-:|:-:|:-:
direction|`String`|`N`|`left`|滚动的方向，支持`up`,`down`,`left`,`right`四个方向，默认向左滚动
duration|`Number`|`N`|`10000`|滚动一轮所需的时间，单位ms
spacing|`Number`|`N`|`0.25`|滚动内容之间的间隙，相对于组件根元素在滚动方向尺寸的比例。当direction为`left`,`right`时，为相对于根元素宽度的比例，其他为相对于高度的比例

## 插槽

名称|必填|说明
:-:|:-:|:-:
默认|`Y`|滚动播放的内容

* **组件会根据插槽内容的尺寸来判断是否滚动，只有当插槽内容在滚动方向上发生溢出时，才会进行滚动播放**
* **如果插槽的内容发生了变化，需要手动调用marquee组件实例的check方法**

## 更新日志

* v1.2.0 发布