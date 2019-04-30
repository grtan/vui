# timer 计时器

> timer是一个计时器组件

## 使用方法

```
<button @click="pause=!pause">play/pause</button>
<div>
    from：<input type="range" min="0" max="60" v-model.number="from">
</div>
<timer :from="from" :pause="pause" @change="change"></timer>
```

```
import { Timer } from 'vivo-ui'

export default {
  data: {
    from: 0,
    pause: true
  },
  methods: {
    change(value, complete) {
      console.log(value, complete)
    }
  },
  components: {
    Timer
  }
}
```

## 属性

名称|类型|必填|默认值|描述
:-:|:-:|:-:|:-:|:-:
from|`Number`|`N`|`0`|初始时间值（单位s）,为0则正计时，大于0则倒计时
pause|`Boolean`|`N`|`false`|是否暂停

## 事件

名称|参数|说明
:-:|:-:|:-:
change|`{value,complete}`|时间变化时触发，value为当前时间，complete表示倒计时是否结束，正计时该参数无效

## 更新日志

* v1.0.0 发布
