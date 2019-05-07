# setType 设置组件类型

> 设置组件类型的方法，支持pc、mobile和响应式类型，设置成pc类型时，组件库所有组件都呈现成pc样式，设置成mobile类型时，呈现成mobile样式，设置成响应式类型时，组件可以响应式地呈现pc、mobile两种样式，并且可以自定义pc、mobile样式的临界值

## 使用方法

```
import { setType } from 'vui'

setType('pc')
setType('mobile')
setType('responsive', 768) //设置成响应式，浏览器窗口<768px时，组件呈现为mobile样式，否则为pc样式
```

## 参数

名称|类型|必填|默认值|描述
:-:|:-:|:-:|:-:|:-:
type|`String`|`Y`|`-`|组件类型，支持`pc`，`mobile`，`responsive`三种类型
boundary|`Number`|`N`|`768`|组件类型为`responsive`时，pc和mobile样式的临界值，单位px

## 更新日志

* v1.0.0 发布
