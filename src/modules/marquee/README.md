# Marquee 跑马灯

> `Marquee`是跑马灯组件，只有内容溢出时才能进行滚动显示。

## 使用方法

```vue
<template>
  <vui-marquee
    ><span class="highlight">万鸦老（Manado），别名美娜多</span
    >，是印度尼西亚北苏拉威西省首府，位于苏拉威西岛北端（北纬1度29分，东经124度50分），濒临苏拉威西海。万鸦老发展至今，是苏拉威西岛的第二大城市，人口近41.75万（2005年），共有9个市辖区，为群山所环绕，素以海岸美景著称。</vui-marquee
  >
</template>

<script>
import { Marquee } from '@game/vui';

export default {
  components: {
    VuiMarquee: Marquee
  },
  ...
};
</script>
```

::: run

```vue
<template>
  <div>
    <vui-marquee :speed="1" :play="play"
      ><span class="highlight">万鸦老（Manado），别名美娜多</span
      >，是印度尼西亚北苏拉威西省首府，位于苏拉威西岛北端（北纬1度29分，东经124度50分），濒临苏拉威西海。万鸦老发展至今，是苏拉威西岛的第二大城市，人口近41.75万（2005年），共有9个市辖区，为群山所环绕，素以海岸美景著称。</vui-marquee
    >
    <vui-button size="mini" @click="play = !play">{{ play ? '暂停' : '播放' }}</vui-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      play: true
    }
  }
}
</script>

<style>
.highlight {
  color: #f00;
}
</style>
```

:::

## 属性

|   名称    |                   类型                    | 必填 | 默认值 |                                                    描述                                                     |
| :-------: | :---------------------------------------: | :--: | :----: | :---------------------------------------------------------------------------------------------------------: |
| direction | `left`&#124;`right`&#124;`up`&#124;`down` | `N`  | `left` |                                           滚动方向，默认向左滚动                                            |
|   speed   |                 `number`                  | `N`  |  `1`   |                                            滚动速度，默认 1 倍速                                            |
|  spacing  |                 `number`                  | `N`  |  `50`  | 滚动内容之间的间距，单位 px。**该值是 viewport scale=1 时的大小，组件会自动转换成实际缩放比例时对应的大小** |
|   play    |                 `boolean`                 | `N`  | `true` |                                    播放/暂停滚动，只有内容溢出时才有效。                                    |

## 插槽

|  名称   | 必填 |     说明     |
| :-----: | :--: | :----------: |
| default | `Y`  | 要显示的内容 |

## 注意

**如果插槽的内容发生了变化，需要手动调用组件实例的 `update` 方法。**

## 作者

谭新 <xin.tan@vivo.com>

## 更新日志

- v2.7.0 发布
