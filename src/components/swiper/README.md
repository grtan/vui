# swiper 轮播组件

> swiper是一个轮播组件

[demo](demo-old/components/swiper.html ':ignore')

## 使用方法

```
<swiper @change="change">
    <swiper-item v-for="item in list" :key="item">
        <div class="item">{{item}}</div>
    </swiper-item>
</swiper>
```

```
import {Swiper,SwiperItem} from 'vivo-ui';

export default {
    components: {
        Swiper,
        SwiperItem
    },
    data: {
        list: [0, 1, 2, 3]
    },
    methods: {
        change: function (value) {
            console.log(value);
        }
    }
};
```

## 属性

名称|类型|必填|默认值|描述
:-:|:-:|:-:|:-:|:-:
direction|`String`|`N`|`left`|轮播的方向
loop|`Boolean`|`N`|`true`|是否循环
interval|`Number`|`N`|`3000`|切换时间间隔，单位ms
swipe|`Boolean`|`N`|`true`|是否支持手指滑动
v-model|`Number`|`N`|`0`|index位置，如果需要人为改变位置，则需要绑定


## 插槽

名称|必填|说明
:-:|:-:|:-:
默认|`N`|内容区域

## 事件

名称|参数|说明
:-:|:-:|:-:
change|{index}|切换完成后触发，index表示当前的位置索引
