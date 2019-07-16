# img 图片

> img 是一个图片组件，支持自定义 loading 和加载失败效果。

## 使用方法

```
<v-img class="width:200px;height:100px;" src="http://xxxx" loading="data:image/jpeg;base64,xxxx" :error="data:image/jpeg;base64,xxxx"></v-img>
```

```
import {Img} from 'vui';

export default {
  components: {
    VImg: Img
  },
  ...
};
```

**通常要给组件设置宽和高**

## 属性

|  名称   |   类型   | 必填 | 默认值 |                                       描述                                       |
| :-----: | :------: | :--: | :----: | :------------------------------------------------------------------------------: |
|   src   | `String` | `Y`  |  `-`   |                                 要加载图片的 src                                 |
| loading | `String` | `N`  |  `-`   | loading 效果图的 src，如不设置该属性，也可通过`loading`插槽来自定义 loading 效果 |
|  error  | `String` | `N`  |  `-`   |   加载失败效果图的 src，如不设置该属性，也可通过`error`插槽来自定义 error 效果   |
|  delay  | `Number` | `N`  |  `0`   |                          延迟多久反馈加载结果，单位 ms                           |

`type`、`duration`、`mode`属性跟 cutover 组件一致

## 插槽

|  名称   | 必填 |                                             说明                                             |
| :-----: | :--: | :------------------------------------------------------------------------------------------: |
| loading | `N`  | loading 效果，当不想使用属性`loading`来指定加载效果图时，可以通过该插槽来自定义 loading 效果 |
|  error  | `N`  | 加载失败效果，当不想使用属性`error`来指定加载失败效果图时，可以通过该插槽来自定义 error 效果 |

## 更新日志

- v1.6.0 发布
