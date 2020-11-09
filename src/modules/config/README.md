# Config 全局配置

## 使用方法

```js
import { Config } from '@game/vui'

Config(options)
```

## options

options 为对象，各属性如下

|  名称  |                     类型                      | 必填 |  默认值   |       描述        |
| :----: | :-------------------------------------------: | :--: | :-------: | :---------------: |
|  size  | `big`&#124;`regular`&#124;`small`&#124;`mini` | `N`  | `regular` |   组件默认尺寸    |
| zIndex |                   `Number`                    | `N`  |   `999`   | 蒙层的起始 zIndex |
|  type  |             `mobile` &#124; `pc`              | `N`  | `mobile`  |   组件样式风格    |

## 作者

谭新 <xin.tan@vivo.com>

## 更新日志

- v1.0.1 发布
