# swiper 轮播组件

> swiper是一个轮播组件

## 使用方法

```
<swiper @change="change">
    <swiper-item v-for="item in list" :key="item">
        <div class="item">{{item}}</div>
    </swiper-item>
</swiper>
```

```
import {Swiper,SwiperItem} from 'vui';

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
v-model|`Number`|`N`|`0`|index位置，如果需要人为改变位置，则需要绑定
direction|`String`|`N`|`left`|轮播的方向
loop|`Boolean`|`N`|`true`|是否循环
interval|`Number`|`N`|`3000`|自动切换的时间间隔，单位ms，`0`表示不自动切换
duration|`Number`|`N`|`300`|切换时动画时间，单位ms
swipe|`Boolean`|`N`|`true`|是否支持手指滑动
threshold|`Number`|`N`|`0.2`|手指滑动时切换的阈值，当滑动超过指定比例才进行切换

## 插槽

名称|必填|说明
:-:|:-:|:-:
默认|`Y`|`swiper-item`内容

**当`loop`为`true`时，如果插槽的内容发生了变化，需要手动调用`swiper`组件实例的`rerender`方法**

## 事件

名称|参数|说明
:-:|:-:|:-:
wait|(`{index,progress,complete}`)|自动轮播时等待切换的状态下触发，`index`表示当前的位置索引，progress为等待进度，范围为`0-100`，`complete`表示是否等待完成
change|(`index`)|切换完成后触发，`index`表示当前的位置索引

## 更新日志

* v1.0.0 发布
