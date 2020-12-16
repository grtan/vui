# 自定义皮肤

> 用户可以通过改变默认皮肤的 scss 变量来自定义组件库皮肤。**由于组件库样式文件使用的 scss 语法目前只有 [dart-sass](https://sass-lang.com/dart-sass) 支持（dart-sass 也是官方推荐），所以自定义皮肤只支持 dart-sass 运行时，请确保[sass-loader](https://www.npmjs.com/package/sass-loader)使用的运行时为 dart-sass。**

## 用法

### 整体引入

自定义`src/skin.scss`如下

```scss
@use "~@game/vui/src/skin/var.scss" with (
  // 覆盖默认皮肤的变量
  $color-primary: xxx,
  $color-success: xxx
);
@use "~@game/vui/src/modules/style/index.scss";
```

`src/main.js`如下

```js
import Vue from 'vue'
import Vui from '@game/vui'
import './skin.scss'
```

### 按需引入

按需引入需要借助[babel-plugin-component](https://github.com/ElementUI/babel-plugin-component)实现

```bash
npm i -D babel-plugin-component
```

`babel.config.js`配置如下

```js
module.exports = {
  plugins: [
    [
      'component',
      {
        libraryName: '@game/vui',
        libDir: 'lib/modules',
        styleLibrary: {
          /**
           * 自定义皮肤目录，必须加上~
           * ~后面表示皮肤目录相对于babel.config.js的路径，路径可以按需调整
           */
          name: '~src/skin',
          path: '[module].scss'
        }
      }
    ]
  ]
}
```

`skin` 目录结构如下

```
├── project
│ ├── node_modules
│ ├── babel.config.js
│ ├── src
│ │ ├── App.vue
│ │ ├── main.js
│ │ ├── skin
│ │ │ ├── _var.scss
│ │ │ └── button.scss // 只有引入了的组件才需要
│ │ │ └── tag.scss
│ │ │ └── ...
```

`skin/_var.scss`如下

```scss
@use "~@game/vui/src/skin/var.scss" with (
  // 覆盖默认皮肤的变量
  $button-color-regular: yellow,
  $tag-color-primary: red,
  ...
);
```

`skin/button.scss`如下

```scss
@use "var.scss";
@use "~@game/vui/src/modules/button/style/index.scss";
```

js 引入代码如下

```js
// 由于babel-plugin-component插件的限制，暂不支持如下别名
// import { Button as VuiButton } from '@game/vui'

import { Button, Tag } from '@game/vui'

Vue.use(Button)
Vue.use(Tag)
```
