# clock 时钟 (v1.9.0+)

> `clock`为日期时钟，能返回年、月、日、周数、星期几和时分秒，**并且当页面滚动或者退到后台时也能准确计时**。

## 使用方法

```
import { clock as Clock } from 'vui'

const clock = new Clock({
  now: Date.now(),
  callback: ({year, month, date, week, day, hour, minute, second}) => {
    ...
  }
})

clock.destroy()   // 销毁
```

## 参数

参数为一个对象，包含如下属性

|   名称   |    类型    | 必填  |    默认值    |                           描述                           |
| :------: | :--------: | :---: | :----------: | :------------------------------------------------------: |
|   now    |  `Number`  |  `N`  | `Date.now()` |   当前时间的unix时间戳，单位ms，通常会设置成服务器时间   |
| callback | `Function` |  `Y`  |     `-`      | 回调函数，参数为`(value)`，`value`保存日期时间相关的数据 |

## callback参数

`callback`的参数`value`为一个对象，各属性如下

|  名称  |   类型   |                   描述                    |
| :----: | :------: | :---------------------------------------: |
|  year  | `Number` |                 当前年份                  |
| month  | `Number` |              当前月份(1-12)               |
|  date  | `Number` |          当前月份的第几天(1-31)           |
|  week  | `Number` | 当年的第几周(1-54，每周的第一天为星期日)  |
|  day   | `Number` | 当前为星期几(1-7，分别表示星期一到星期日) |
|  hour  | `Number` |           当前时间的小时(0-23)            |
| minute | `Number` |           当前时间的分钟(0-59)            |
| second | `Number` |           当前时间的秒数(0-59)            |

## 方法

`clock`对象包含如下方法

|  名称   | 参数  |   描述   |
| :-----: | :---: | :------: |
| destroy |  `-`  | 销毁实例 |

## 更新日志

* v1.9.0 发布
