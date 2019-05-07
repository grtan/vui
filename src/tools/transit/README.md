# transition 过渡

> 数值过渡方法，支持`easing`的所有缓动类型

## 使用方法

```
import { transit } from 'vui'

const transition = transit(from, to, callback, duration, easing)
transition.play()   //开始过渡
transition.pause()  //暂停过渡
```

## 参数

名称|类型|必填|默认值|描述
:-:|:-:|:-:|:-:|:-:
from|`Number`|`Y`|`-`|初始值
to|`Number`|`Y`|`-`|结束值
callback|`Function`|`Y`|`-`|过渡的回调函数，参数为`{value,complete}`，value为当前值，complete表示是否过渡完成
duration|`Number`|`N`|`300`|过渡持续时间，单位ms
easing|`Function`|`N`|`linear`|缓动函数，支持`easing`里的所有类型，如`sineEaseIn`，`bounceEaseInOut`等

## 更新日志

* v1.0.0 发布
