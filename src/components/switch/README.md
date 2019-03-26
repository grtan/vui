# switch 开关

> switch是一个开关组件

## 使用方法

```
<div class="line">
    禁用<input type="checkbox" v-model="disabled">
</div>
<div class="line">
    阻止切换<input type="checkbox" v-model="prevent">
</div>
<v-switch v-model="value" :disabled="disabled" :prevent="prevent" :image="image" @click="click"
          @change="change"></v-switch>
```

```
import {Switch} from 'vui';

export default {
    components: {
        VSwitch: Switch
    },
    data: {
        value: false,
        disabled: false,
        prevent: false,
        image: ['https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1867698083,1429793695&fm=27&gp=0.jpg', 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=307303917,2423907447&fm=27&gp=0.jpg']
    },
    methods: {
        click(value) {
            this.prevent && setTimeout(() => {
                this.value = !value;
            }, 1000);
        },
        change(value) {
            console.log(value)
        }
    }
};
```

## 属性

名称|类型|必填|默认值|描述
:-:|:-:|:-:|:-:|:-:
v-model|`Boolean`|`Y`|`-`|是否选中
color|`Array`|`N`|`['#fff', '#ffe26d']`|切换时的颜色，第一个表示未选中时的颜色，第二个表示选中时的颜色，如果配置了image则无效
image|`Array`|`N`|`-`|切换时的图片，第一个表示未选中时的图片，第二个表示选中时的图片，主要用来自定义开关样式
disabled|`Boolean`|`N`|`false`|是否禁用
prevent|`Boolean`|`N`|`false`|点击时是否阻止默认切换行为

## 事件

名称|参数|说明
:-:|:-:|:-:
change|`{currentValue}`|切换时触发，currentValue为切换后的值
click|`{value}`|未禁用的状态下点击时触发，value为点击时的当前值
