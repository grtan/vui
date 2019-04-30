# navbar 导航栏

> navbar是一个导航栏组件

## 使用方法

```
<div :class="$style.root">
  <navbar background="#ad9">
    <template slot="left">left</template>
    <template>title</template>
    <template slot="right">rightright</template>
  </navbar>
  <navbar background="#ad9">
    <template slot="left">left<br>left</template>
    <template>title</template>
  </navbar>
  <navbar background="#ad9">
    <template>title</template>
    <template slot="right">right</template>
  </navbar>
  <navbar background="#ad9">
    <template slot="left">left</template>
  </navbar>
  <navbar background="#ad9">
    <template>title</template>
  </navbar>
  <navbar background="#ad9">
    <template slot="right">right</template>
  </navbar>
</div>
```

```
import { Navbar } from 'vui'

export default {
  components: {
    Navbar
  }
}
```

## 属性

名称|类型|必填|默认值|描述
:-:|:-:|:-:|:-:|:-:
background|`String`|`N`|`-`|navbar背景，支持所有合法的css背景

## 插槽

名称|必填|说明
:-:|:-:|:-:
默认|`N`|中间区域内容
left|`N`|左边区域内容
right|`N`|右边区域内容

**这三个区域的内容始终垂直居中，且不管左右两侧宽度为多少，中间区域始终占据整个navbar的宽度**

## 更新日志

* v1.0.0 发布
