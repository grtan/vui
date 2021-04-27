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

## 注意事项

@game/vui 构建后提供两种模块的代码供外界使用，一种是 lib 目录中的 es 模块代码，一种是 dist 目录中的 umd 模块代码。其`package.json`如下

```json
{
  "name": "@game/vui",
  "main": "dist/vui.js",
  "module": "lib/modules/index.js",
  "types": "lib/modules/index.d.ts",
  "sideEffects": [
    "*.css",
    "*.scss"
  ],
  ...
}
```

通常使用方利用 webpack、rollup 等构建工具打包代码时，请使用 es 模块代码导入@game/utils。这样导入的就是 module 字段指定的 es 模块代码，可以充分利用构建工具的[tree-shaking](https://webpack.js.org/guides/tree-shaking/)功能，实现真正的按需加载，减小构建后的包体大小。[详见](https://loveky.github.io/2018/02/26/tree-shaking-and-pkg.module/)

为了让@game/vui 能与使用方项目自身的代码复用相同的 npm 包代码，构建后的 es 模块代码并没有将引用的 npm 包代码打包进来，而是通过 import 的方式来引用的。这样当使用方自身项目代码与@game/vui 引用了**相同且版本兼容**的 npm 包时，构建工具只会打包一份 npm 包的代码，从而减小构建后包体大小。而且为了更多的与使用方项目自身代码共享第三方依赖，@game/vui 中 babel 转码时都是使用的 core-js polyfill 方案，而不是使用的 core-js-pure polyfill。

构建后的 es 模块代码如下

```js
import 'core-js/modules/es.array.includes.js'
import 'core-js/modules/es.reflect.construct.js'
import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck'
import _inherits from '@babel/runtime/helpers/esm/inherits'
import _possibleConstructorReturn from '@babel/runtime/helpers/esm/possibleConstructorReturn'
import _getPrototypeOf from '@babel/runtime/helpers/esm/getPrototypeOf'
import { __decorate } from 'tslib'
import { Prop, Component, Vue } from 'vue-property-decorator'
import __vue_normalize__ from 'vue-runtime-helpers/dist/normalize-component.mjs'

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct()
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor
      result = Reflect.construct(Super, arguments, NewTarget)
    } else {
      result = Super.apply(this, arguments)
    }
    return _possibleConstructorReturn(this, result)
  }
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false
  if (Reflect.construct.sham) return false
  if (typeof Proxy === 'function') return true
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}))
    return true
  } catch (e) {
    return false
  }
}

var VComponent = /*#__PURE__*/ (function (_Vue) {
  _inherits(VComponent, _Vue)

  var _super = _createSuper(VComponent)

  function VComponent() {
    _classCallCheck(this, VComponent)

    return _super.apply(this, arguments)
  }

  return VComponent
})(Vue)

__decorate(
  [
    Prop({
      type: String,
      default: 'primary'
    })
  ],
  VComponent.prototype,
  'vue',
  void 0
)

__decorate(
  [
    Prop({
      type: Boolean,
      default: true
    })
  ],
  VComponent.prototype,
  'underline',
  void 0
)

__decorate(
  [
    Prop({
      type: Boolean,
      default: false
    })
  ],
  VComponent.prototype,
  'disabled',
  void 0
)

__decorate(
  [
    Prop({
      type: String,
      default: 'regular'
    })
  ],
  VComponent.prototype,
  'size',
  void 0
)

__decorate(
  [
    Prop({
      type: String,
      default: ''
    })
  ],
  VComponent.prototype,
  'href',
  void 0
)

__decorate(
  [
    Prop({
      type: String,
      default: ''
    })
  ],
  VComponent.prototype,
  'icon',
  void 0
)

__decorate(
  [
    Prop({
      type: String,
      default: 'before'
    })
  ],
  VComponent.prototype,
  'iconPosition',
  void 0
)

VComponent = __decorate(
  [
    Component({
      name: 'VuiLink'
    })
  ],
  VComponent
)
var script = VComponent

var __vue_script__ = script
/* template */

var __vue_render__ = function __vue_render__() {
  var _obj

  var _vm = this

  var _h = _vm.$createElement

  var _c = _vm._self._c || _h

  return _c(
    'a',
    {
      class: [
        'vui-link',
        ((_obj = {}),
        (_obj['vui-link--' + _vm.vue] = ['primary', 'regular', 'success', 'fail'].includes(_vm.vue)),
        (_obj['vui-link--' + _vm.size] = ['big', 'regular', 'small', 'mini'].includes(_vm.size)),
        _obj)
      ],
      attrs: {
        disabled: _vm.disabled,
        href: _vm.href,
        underline: _vm.underline
      },
      on: {
        click: function click($event) {
          !_vm.disabled && _vm.emit('click')
        }
      }
    },
    [
      _vm.icon && _vm.iconPosition === 'before' ? _c('div', [_vm._v('icon')]) : _vm._e(),
      _vm._v(' '),
      _vm._t('default'),
      _vm._v(' '),
      _vm.icon && _vm.iconPosition === 'after' ? _c('div', [_vm._v('icon')]) : _vm._e()
    ],
    2
  )
}

var __vue_staticRenderFns__ = []
__vue_render__._withStripped = true
/* style */

var __vue_inject_styles__ = undefined
/* scoped */

var __vue_scope_id__ = undefined
/* module identifier */

var __vue_module_identifier__ = undefined
/* functional template */

var __vue_is_functional_template__ = false
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/ __vue_normalize__(
  {
    render: __vue_render__,
    staticRenderFns: __vue_staticRenderFns__
  },
  __vue_inject_styles__,
  __vue_script__,
  __vue_scope_id__,
  __vue_is_functional_template__,
  __vue_module_identifier__,
  false,
  undefined,
  undefined,
  undefined
)

export default __vue_component__
```

### 问题

虽然上述方式能有效优化构建后包体大小，但也存在一个问题：@game/vui 提供的 es 模块代码虽然已经用 babel 进行转码了，但 import 引用的第三方 npm 包是不受控的，可能存在兼容性问题，比如有些第三方包中仍然存在 const、Map、Set、箭头函数等较新的 es 语法或 api。而通常我们的项目中构建代码时，对于 node_modules 中的代码都是不做 babel 转码处理的。这样就会导致项目构建后的代码中可能存在一些不兼容低版本浏览器的语法，导致运行时报错。

> @game/vui 提供的 umd 模块代码所有内容都经过了 babel 转码，不会存在上述问题。

### 解决方案

由于依赖的第三方 npm 包可能不仅仅只包含较新的 es api，还可能包含有较新的 es 语法。所以通过在@game/vui 中引入使用到的 es polyfill 仍然解决不了问题，因为 polyfill 只能解决 api 的问题，无法解决新语法的问题。但我们又不想放弃外置第三方 npm 依赖包带来的优点，同时联想到使用方项目本身代码也可能会引入一些存在兼容性问题的第三方 npm 包，所以**这个问题只能由使用方自身来处理比较合适，即项目代码生产环境构建时对于 node_modules 中的文件全部要用 babel 进行转码。注意：core-js 和 core-js-pure 这两个 npm 包必须要排除在外，不能用 babel 转码。因为这两个包本身就是用来进行 polyfill 的，已经不存在兼容性问题，如果还用 babel 进行转码，会造成其循环引用自身，导致项目构建后的代码出现异常。**

`webpack.config.js`配置如下

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        // 排除core-js和core-js-pure
        exclude: /\/node_modules\/core-js(-pure)?\//,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  // 按需用core-js polyfill代码
                  useBuiltIns: 'usage',
                  corejs: '3.10'
                }
              ],
              // 编译jsx
              '@vue/babel-preset-jsx'
            ],
            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  // 使用es模块的runtime helpers
                  useESModules: true
                }
              ]
            ]
          }
        }
      }
    ]
  }
}
```
