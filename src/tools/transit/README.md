# transit 过渡

> 数值过渡方法，支持`easing`的所有缓动类型，**且当页面退到后台时也能继续过渡**

## 使用方法

```
import { transit } from 'vui'

// v1.8.0以前的调用方式如下
const transition = transit(from, to, callback, duration, easing)

// v1.8.0+调用方式如下
const transition = new transit({
  from,
  to,
  callback,
  duration,
  easing
})

transition.play()   //开始过渡
transition.pause()  //暂停过渡
transition.seek(0.5).play()   // 链式调用
```

## 参数

|   名称   |    类型    | 必填  |  默认值  |                                       描述                                        |
| :------: | :--------: | :---: | :------: | :-------------------------------------------------------------------------------: |
|   from   |  `Number`  |  `Y`  |   `-`    |                                      初始值                                       |
|    to    |  `Number`  |  `Y`  |   `-`    |                                      结束值                                       |
| callback | `Function` |  `Y`  |   `-`    | 过渡的回调函数，参数为`{value,complete}`，value为当前值，complete表示是否过渡完成 |
| duration |  `Number`  |  `N`  |  `300`   |                               过渡持续时间，单位ms                                |
|  easing  | `Function` |  `N`  | `linear` |      缓动函数，支持`easing`里的所有类型，如`sineEaseIn`，`bounceEaseInOut`等      |

## 方法

`transition`对象包含如下方法

|             名称              |     参数     |        结果         |                                                                         描述                                                                          |
| :---------------------------: | :----------: | :-----------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------: |
|             play              |     `-`      |         `-`         |                                                                       开始过渡                                                                        |
|             pause             |     `-`      |         `-`         |                                                                       停止过渡                                                                        |
|             seek              | `(progress)` |         `-`         |                                     定位到指定进度，参数`progress`的范围为`0-1`，`0`表示起始位置，`1`表示终点位置                                     |
|            invert             |     `-`      |         `-`         |                                                                     反转过渡顺序                                                                      |
| isReverse **(v1.8.0+已删除)** |     `-`      |         `-`         |                                                 获取当前过渡顺序，`true`表示反序过渡，`false`表示正序                                                 |
|     getInfo **(v1.8.0+)**     |     `-`      | `{reverse, status}` | 获取当前过渡信息，`reverse`表示过渡顺序，`true`为反序过渡，`false`为正序；`status`表示过渡状态，`play`为正在过渡，`pause`为已暂停，`complete`为已完成 |

## 更新日志

* v1.8.0 修复页面退到后台时过渡停止的问题，删除`isReverse`方法，新增`getInfo`方法
* v1.0.0 发布
