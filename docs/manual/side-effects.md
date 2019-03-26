# sideEffects

> `sideEffects`指的是`package.json`的`sideEffects`属性配置，主要是配合webpack v4+的tree shaking功能来使用的，详情请看[tree shaking](https://www.webpackjs.com/guides/tree-shaking/)

#### 例子

假如main.js需要引入一个工具库tool.js，作用是把body的颜色改成红色

tool.js代码如下

```
document.body.style.backgroundColor = 'red'
```

main.js代码如下

```
import './tool'
...
```

单从语法上来看，是引入了tool.js，但并没有使用其导出的变量（tool.js也并没有导出变量）。如果webpack打包时启用了tree shaking功能，那么就会把tool.js的代码标记为未使用，代码压缩时就会把这些代码删掉。很显然，这样是会有问题的，解决办法就是我们将tool.js加入到`package.json`的`sideEffects`属性中。这样tool.js的代码就不会被标记为未使用的，从而压缩时不会被删掉。

**进行组件库开发时，如果遇到类似场景，也需要将引入的文件加入到`package.json`的`sideEffects`属性中**

