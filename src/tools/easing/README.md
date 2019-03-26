# easing 缓动函数

> 支持`linear`、`sineEaseIn`、`sineEaseOut`、`sineEaseInOut`、`quadEaseIn`、`quadEaseOut`、`quadEaseInOut`、`cubicEaseIn`、`cubicEaseOut`、`cubicEaseInOut`、`quartEaseIn`、`quartEaseOut`、`quartEaseInOut`、`quintEaseIn`、`quintEaseOut`、`quintEaseInOut`、`expoEaseIn`、`expoEaseOut`、`expoEaseInOut`、`circEaseIn`、`circEaseOut`、`circEaseInOut`、`backEaseIn`、`backEaseOut`、`backEaseInOut`、`elasticEaseIn`、`elasticEaseOut`、`elasticEaseInOut`、`bounceEaseIn`、`bounceEaseOut`、`bounceEaseInOut`

[详情](https://easings.net/zh-cn)

## 使用方法

```
import { linear, sineEaseIn, sineEaseOut, sineEaseInOut } from 'vui'

/*
 * 缓动函数，其他的类型用法一样
 * t: current time（当前时间）；
 * b: beginning value（初始值）；
 * c: change in value（变化量）；
 * d: duration（持续时间）。
 */
linear(t, b, c, d)
sineEaseIn(t, b, c, d)
sineEaseOut(t, b, c, d)
sineEaseInOut(t, b, c, d)
```

## 参数（所有缓动函数都一样）

名称|类型|必填|默认值|描述
:-:|:-:|:-:|:-:|:-:
t|`Number`|`Y`|`-`|当前时间
b|`Number`|`Y`|`-`|初始值
c|`Number`|`Y`|`-`|变化量
d|`Number`|`Y`|`-`|持续时间
