# 目录/文件结构

#### 目录结构

```
|-- vivo-ui
    |-- src
        |-- index.js                        // 入口文件
        |-- assets
        |   |-- js                          // 引用的第三方非npm库
        |   |   |-- css-element-queries
        |   |   |   |-- ResizeSensor.js
        |   |   |-- modernizr
        |   |       |-- modernizr.js
        |   |-- style                       // 公共样式
        |       |-- base.less
        |   |-- image                       // 公共图片
        |       |-- icon.png
        |-- components                      // 组件目录
        |   |-- city-picker
        |   |   |-- README.md
        |   |   |-- index.vue
        |   |-- cutover                     // 一个目录下只存放一个组件（即只能有一个.vue文件），否则style目录下同一个皮肤不同组件的样式文件命名就会冲突（比如default皮肤的样式文件都必须命名为default.less）
        |   |   |-- README.md
        |   |   |-- index.vue
        |   |   |-- style                   // 组件皮肤目录，默认皮肤名为default
        |   |       |-- default.less
        |   |-- dialog
        |   |   |-- README.md
        |   |   |-- index.vue
        |   |   |-- style
        |   |       |-- default.less        // 默认皮肤样式
        |   |-- load-more
        |   |   |-- README.md
        |   |   |-- index.vue
        |   |   |-- image                   // 组件图片目录
        |   |       |-- loading.gif
        |   |       |-- loading.png
        |   |   |-- style
        |   |       |-- default.less
        |   |-- toast
        |   |   |-- README.md
        |   |   |-- index.vue
        |   |   |-- style
        |   |       |-- default.less
        |-- directives                      // 指令目录
        |   |-- img
        |       |-- README.md
        |       |-- index.js
        |-- mixins                          // mixin目录
        |   |-- type
        |       |-- README.md
        |       |-- index.js
        |-- plugins                         // 插件目录
        |   |-- dialog
        |   |   |-- README.md
        |   |   |-- index.js
        |-- tools                           // 自定义工具方法目录
            |-- easing
            |   |-- README.md
            |   |-- index.js
            |-- set-page-type
            |   |-- README.md
            |   |-- index.js

```

`vivo-ui`的`src`目录结构如上所示，`index.js`为整个库的入口文件，组件用到的所有资源都放在组件的目录下，`assets`目录存放一些公共的资源，所有的`js`代码中请使用`es6`模块语法

#### index.js结构

```
// 自定义工具方法，变量名小写字母开头
export {
  linear,
  sineEaseIn,
  sineEaseOut,
  sineEaseInOut,
  ...
} from './tools/easing/index'
export { default as setPageType } from './tools/set-page-type/index'

// 组件，变量名大写字母开头
export { default as Dialog } from './components/dialog/index.vue'
export { default as Toast } from './components/toast/index.vue'

// 插件，以大写P为前缀
export { default as PDialog } from './plugins/dialog/index'
export { default as PToast } from './plugins/toast/index'

// 指令，以大写D为前缀
export { default as DImg } from './directives/img/index'
```

所有需要导出的变量都要在index.js文件中导出，变量名无强制要求，建议按照上述约定执行，方便管理维护

#### 组件结构

```
<template>
    <cutover class="vui-layer" :class="{'vui-layer-global':global}" v-bind="$attrs">
        <div slot-scope="slot" :style="Object.assign({backgroundColor:background},slot.styleObj)"
             v-show="value" @click.self="onclick" @touchmove.self="onTouchMove">
            <slot></slot>
        </div>
    </cutover>
</template>

<!--如果组件的样式与皮肤无关，请写在style标签内，而不要写在style目录的less文件内-->
<style lang="less">
    .vui-layer {
        ...
    }
</style>

<script>
  // 引用lib内部的文件请使用相对路径
  import Cutover from '../cutover/index.vue'

  export default {
    name: 'vui-layer',
    components: {
      Cutover
    },
    ...
  }
</script>
```

一个目录下只存放一个组件，约定给组件都设置name为`vui-xxx`格式，组件里的样式名都采用`vui-xxx-`前缀，且组件根元素都设置`vui-xxx`类名。css规则也必须遵循如上写法，限制只应用到组件内部元素上，防止影响页面上其他的元素。如果组件的全部样式都与皮肤无关，请将全部样式写在`<style>`标签内，否则将全部样式都写在`style`目录下对应的皮肤`less`文件中。有时在响应式页面中，当页面宽度变化时，有些组件需要支持`pc`和`mobile`样式切换。`vivo-ui`也支持组件样式切换。

通过设置`html`元素的`vui-pc`属性来切换`pc`和`mobile`类型，设置`vui-skin`属性来切换皮肤，所以样式写法如下（以`dialog`为例）

default.less——默认皮肤

```
@import "../../../assets/style/base";

@name: vui-dialog;

html:not([@{skin-attr}]) {
  .@{name} {
    ...
  }

  /*pc样式*/
  &[@{pc-attr}] {
    .@{name} {
      ...
    }
  }
}
```

myskin.less——myskin皮肤

```
@import "../../../assets/style/base";

@name: vui-dialog;

html[@{skin-attr}=myskin] {
  .@{name} {
    ...
  }

  /*pc样式*/
  &[@{pc-attr}] {
    .@{name} {
      ...
    }
  }
}
```

如果该组件样式与皮肤无关，则将样式写在`<style></style>`内，如下

```
<style lang="less">
    @import "../../../assets/style/base";

    @name: vui-dialog;

    .@{name} {
        ...

        /*pc样式*/
        html[@{pc-attr}] & {
            ...
        }
    }
</style>
```

#### 插件结构

```
import Toast from '../../components/toast/index.vue'

export default {
  install (Vue) {
    const list = []

    Toast.mixins = [{
      created () {
        list.push(this.list)
      }
    }]

    const vm = new Vue({
      components: {
        Toast
      },
      el: document.body.appendChild(document.createElement('div')),
      data: {
        slot: '',
        ...(function () {
          const defaults = {}

          Object.keys(Toast.props).forEach(function (key) {
            defaults[key] = Toast.props[key].default
          })

          return defaults
        }())
      },
      render () {
        return (
          <toast ref="toast" class="vui-toast-plugin" {...{
            className: this.className,
            time: this.time,
            position: this.position,
            single: this.single
          }}>
            <div domPropsInnerHTML={this.slot}></div>
          </toast>
        )
      }
    })

    Vue.$vui = Vue.prototype.$vui = Vue.prototype.$vui || {}
    Vue.prototype.$vui.toast = {
      show (option) {
        Object.keys(Toast.props).forEach(function (key) {
          vm[key] = option[key] !== undefined ? option[key] : Toast.props[key].default
        })
        vm.slot = option.slot
        vm.$refs.toast.show()
      },
      hide () {
        list.forEach(function (item) {
          item.splice(0)
        })
      }
    }
  }
}

```

插件中如果需要渲染dom，请务必使用render函数（支持jsx语法）而不是直接使用template。因为用户很可能在项目中只引入了vue runtime。这就要求加载的组件、插件提前将template编译成render函数，否则会导致运行时报错。

#### 指令结构

```
export default {
  inserted (el, binding) {
    ...
  },
  update (el, binding) {
    ...
  }
}
```

指令文件导出指令的配置对象

#### 自定义工具结构

```
function BounceEaseInOut (t, b, c, d) {
  if (t < d / 2) {
    return BounceEaseIn(t * 2, 0, c, d) * 0.5 + b
  } else {
    return BounceEaseOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b
  }
}

export {
  ...
  BounceEaseInOut
}
```

自定义工具文件就是普通的es模块，导出常规的对象、函数等