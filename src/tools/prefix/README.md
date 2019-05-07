# prefix 浏览器前缀

> 浏览器前缀检测的一些方法

## 使用方法

```
import { prefixed, raf, caf } from 'vui'

const transitionName = prefixed('transition')   //跟Modernizr.prefixed一样，添加对应的浏览器前缀
const rafFn = prefixed('requestAnimationFrame', window)
const id = raf(function () {})  //请求动画帧，如果原生不支持requestAnimationFrame，则用setTimeout(callback,16.67)替代
caf(id)     //取消动画帧
```

## 更新日志

* v1.0.0 发布
