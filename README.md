# vui

> vivo的vue组件及各种工具库，组件支持设置`pc`、`mobile`和`responsive`三种类型的样式，支持设置皮肤，并能实现按需加载

### 使用

**整体引入**

```
<link rel="stylesheet" href="xx/vui/dist/vui.min.css">
<script src="xx/vui/dist/vui.min.js"></script>
```

**按需加载**

> 只加载被引用的工具方法和组件，且组件只会加载指定皮肤的样式

```
// 使用时请将npm源设置成公司内部npm仓库http://npm.vivo.xyz
import { Toast, Dialog, sineEaseOut, ... } from '@vivo/vui'
```

按需加载需要配合[babel-plugin-lib-import](https://www.npmjs.com/package/babel-plugin-lib-import)使用，且能自定义配置来实现加载特定皮肤

```
npm i -D babel-plugin-lib-import
```

.babelrc
```
{
  "plugins": [
    [
      "lib-import",
      {
        "name": "@vivo/vui"
      }
    ]
  ]
}
```