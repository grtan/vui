# 快速上手

## 安装

```bash
npm i @game/vui --registry http://npm.vivo.com.cn
```

安装时记得将 npm 源设置成[公司内部 npm 仓库](http://npm.vivo.com.cn)

## 使用

### `<script>`标签引入

```html
<link rel="stylesheet" href="xxx/node_modules/@game/vui/dist/vui.min.css" />
<script src="xxx/node_modules/vue/dist/vue.min.js"></script>
<script src="xxx/node_modules/@game/vui/dist/vui.min.js"></script>
<script>
  Vue.use(VUI.default, options)
  // v2.1.3+才支持version字段
  console.log(VUI.default.version)
</script>
```

### 整体引入

```js
import Vue from 'vue'
import Vui from '@game/vui'
import '@game/vui/lib/modules/style/index.css'

Vue.use(Vui, options)
console.log(Vui.version)
```

#### options

options 为对象，各属性如下

|    名称    | 类型 | 必填 | 默认值 |                           描述                           |
| :--------: | :--: | :--: | :----: | :------------------------------------------------------: |
| PluginName | `-`  | `N`  |  `-`   | `PluginName`为组件库提供的插件名，值为对应插件支持的选项 |

### 按需引入

按需引入需要借助[babel-plugin-component](https://github.com/ElementUI/babel-plugin-component)实现

```bash
npm i -D babel-plugin-component
```

babel.config.js 配置如下

```js
module.exports = {
  plugins: [
    [
      'component',
      {
        libraryName: '@game/vui',
        libDir: 'lib/modules',
        style: 'style/index.css'
      }
    ]
  ]
}
```

```js
// 由于babel-plugin-component插件的限制，暂不支持如下别名
// import { Button as VuiButton } from '@game/vui'

import { Button, Dialog, HistoryAction } from '@game/vui'

Vue.use(Button)
Vue.use(Dialog)
Vue.use(HistoryAction, router)
```

## 全局设置

组件库支持全局设置组件默认尺寸、蒙层起始 zIndex 和样式风格

```html
<script src="xxx/node_modules/@game/vui/dist/vui.min.js"></script>
<script>
  // 方式1
  VUI.default.config(options)
</script>
```

```js
// 方式2
import Vui from '@game/vui'

Vui.config(options)
```

```js
// 方式3
import { Config } from '@game/vui'

Config(options)
```

#### options

options 为对象，各属性如下

|  名称  |                     类型                      | 必填 |  默认值   |       描述        |
| :----: | :-------------------------------------------: | :--: | :-------: | :---------------: |
|  size  | `big`&#124;`regular`&#124;`small`&#124;`mini` | `N`  | `regular` |   组件默认尺寸    |
| zIndex |                   `Number`                    | `N`  |   `999`   | 蒙层的起始 zIndex |
|  type  |             `mobile` &#124; `pc`              | `N`  | `mobile`  |   组件样式风格    |
