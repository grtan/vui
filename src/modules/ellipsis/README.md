# Ellipsis 文本超长省略

> Ellipsis 是非常通用的长文本超长省略组件。其主体内容不仅限于纯文本，还支持行内内联元素，超长时显示的打点区域的内容也支持自定义 html 内容。

## 使用方法

```vue
<template>
  <vui-ellipsis :max-line="2">
    马尔代夫共和国（The Republic of Maldives，原名马尔代夫群岛 [1]
    ），简称“马尔代夫”(Maldives)，印度洋上的群岛国家。距离印度南部约600公里，距离斯里兰卡西南部约750公里。26组自然环礁、1192个珊瑚岛分布在9万平方公里的海域内，其中约200个岛屿有人居住。
    [2] 陆地面积298平方公里，是亚洲最小的国家。
    <div slot="ellipsis">...</div>
  </vui-ellipsis>
</template>

<script>
import { Ellipsis } from '@game/vui';

export default {
  components: {
    VuiEllipsis: Ellipsis
  },
  ...
};
</script>
```

::: run

```vue
<template>
  <vui-ellipsis class="root" :max-line="2" :collapse="collapse" :monitor-resize="true">
    马尔代夫共和国（The Republic of Maldives，原名马尔代夫群岛 [1] ）<img
      src="http://www.7jiaqi.com/Upload/%E5%B2%9B%E5%B1%BF%E5%9B%BE%E7%89%87/ozen/%E9%A3%8E%E6%99%AF%E5%9B%BE/%E9%A3%8E%E6%99%AF%E5%A4%B4%E5%9B%BE.jpg"
    />，简称<span class="highlight">“马尔代夫”</span
    >，印度洋上的群岛国家。距离印度南部约600公里，距离斯里兰卡西南部约750公里。26组自然环礁、1192个珊瑚岛分布在9万平方公里的海域内，其中约200个岛屿有人居住。
    [2] 陆地面积298平方公里，是亚洲最小的国家。
    <div slot="ellipsis" class="ellipsis">
      <div v-if="collapse">...<span @click="collapse = false">展开</span></div>
      <span v-else @click="collapse = true">收起</span>
    </div>
  </vui-ellipsis>
</template>

<script>
export default {
  data() {
    return {
      collapse: true
    }
  }
}
</script>

<style>
.root {
  text-align: justify;
}

.root img {
  height: 1.5em;
  vertical-align: bottom;
  width: 2.9em;
}

.highlight {
  color: #f00;
}

.ellipsis span {
  color: #f00;
  float: right;
  margin-left: 1em;
}
</style>
```

:::

## 属性

|              名称              |   类型    | 必填 | 默认值  |                                            描述                                            |
| :----------------------------: | :-------: | :--: | :-----: | :----------------------------------------------------------------------------------------: |
|            max-line            | `number`  | `N`  |   `1`   |                                      内容最多显示几行                                      |
|            collapse            | `boolean` | `N`  | `true`  |                 当内容超过`max-line`指定行数时才生效。表示折叠还是展开内容                 |
| show-ellipsis-when-uncollapsed | `boolean` | `N`  | `true`  | 当内容超过`max-line`指定行数时才生效。表示展开显示全部内容时，是否还显示`ellipsis`插槽内容 |
|         monitor-resize         | `boolean` | `N`  | `false` |      是否监控容器宽度变化来进行自适应渲染。该属性只在组件初始化时生效，后续改变不生效      |

## 插槽

|   名称   | 必填 |                       说明                       |
| :------: | :--: | :----------------------------------------------: |
| default  | `Y`  | 主体内容，**不仅限于纯文本，还支持行内内联元素** |
| ellipsis | `Y`  |         打点区域内容，**支持任意 html**          |

## 作者

谭新 <xin.tan@vivo.com>

## 更新日志

- v2.5.0 发布
