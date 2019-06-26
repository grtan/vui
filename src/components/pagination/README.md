# pagination 分页组件

> pagination是一个pc端分页组件。

## 使用方法

```
<pagination v-model="current" :total="114" :size="9" :showGoto="true"></pagination>
```

```
import {Pagination} from 'vui'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      current: 8
    }
  },
  watch: {
    current(value) {
      alert(`当前第${value}页`)
    }
  }
}
```

## 属性

名称|类型|必填|默认值|描述
:-:|:-:|:-:|:-:|:-:
v-model|`Number`|`N`|`1`|当前是第几页
total|`Number`|`Y`|`-`|总页数
size|`Number`|`N`|`7`|最多显示几个页码按钮（包括...按钮），要求为>=5的奇数
showGoto|`Boolean`|`N`|`Y`|是否显示直接跳转区域**（输入区域只能输入合法的页码）**

## 更新日志

* v1.3.2 修复页码输入框为空时，enter键还有效的问题
* v1.0.0 发布