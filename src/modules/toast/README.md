# Toast 轻提示

## 使用方法

```js
import Toast from 'vui'

Toast('xxx')

// 全局使用
Vue.use(Toast)

Vue.$vui.toast('xxx')
// 或者在组件内调用
this.$vui.toast('xxx')
```

## 属性

|   名称    |   类型    | 必填 | 默认值  |       描述        |
| :-------: | :-------: | :--: | :-----: | :---------------: |
| duration  | `Number`  | `N`  | `3000`  | 显示时长，单位 ms |
| allowHtml | `Boolean` | `N`  | `false` | 内容是否当作 html |
| className | `String`  | `N`  |   `-`   |    自定义类名     |

## 作者

谭新<xin.tan@vivo.com>

## 更新日志

- v1.0.0 发布
