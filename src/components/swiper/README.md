# swiper 轮播组件

> swiper是一个轮播组件，支持自定义轮播方向、是否循环、是否可以手指滑动以及自定义角度等功能。

## 使用方法

[demo源码](https://gitlab.vmic.xyz/game-fed/vui/blob/master/demo/src/views/components/swiper/index.vue)

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

|        名称         |   类型    | 必填  | 默认值 |                              描述                               |
| :-----------------: | :-------: | :---: | :----: | :-------------------------------------------------------------: |
|       v-model       | `Number`  |  `N`  |  `0`   |           index位置，如果需要人为改变位置，则需要绑定           |
|      direction      | `String`  |  `N`  | `left` |                           轮播的方向                            |
|        loop         | `Boolean` |  `N`  | `true` |                            是否循环                             |
|      interval       | `Number`  |  `N`  | `3000` |          自动切换的时间间隔，单位ms，`0`表示不自动切换          |
|      duration       | `Number`  |  `N`  | `300`  |                     切换时动画时间，单位ms                      |
|        swipe        | `Boolean` |  `N`  | `true` |                        是否支持手指滑动                         |
|      threshold      | `Number`  |  `N`  | `0.2`  |       手指滑动时切换的阈值，当滑动超过指定比例才进行切换        |
| angle **(v1.8.0+)** | `Number`  |  `N`  |  `45`  | 手指初始滑动时与轮播方向的夹角要小于等于`angle`才能进行滑动切换 |

## 插槽

| 名称  | 必填  |       说明        |
| :---: | :---: | :---------------: |
| 默认  |  `Y`  | `swiper-item`内容 |

**如果`swiper-item`的数目或者尺寸发生了变化，需要手动调用`swiper`组件实例的`rerender`方法**

## swiper-item作用域插槽 (v1.13.0+)

`swiper-item`的`slot-scope`属性如下

| 名称  |   类型   |                                         描述                                         |
| :---: | :------: | :----------------------------------------------------------------------------------: |
| index | `Number` | 当前`swiper-item`的位置，从`0`开始，**在循环模式下必须使用该属性才能获取正确的位置** |

## 事件

|           名称            |             参数              |                                                                                     说明                                                                                     |
| :-----------------------: | :---------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|           wait            | (`{index,progress,complete}`) |                           自动轮播时等待切换的状态下触发，`index`表示当前的位置索引，progress为等待进度，范围为`0-100`，`complete`表示是否等待完成                           |
|          change           |           (`index`)           |                                                                  切换完成后触发，`index`表示当前的位置索引                                                                   |
| pos-change **(v1.13.0+)** |         (`position`)          | 位置变化时实时触发，`position`表示当前位置，比如1表示正在显示第二个子项，1.5表示第二个子项正好移出一半，第三个子项刚好进入一半。**（循环模式下首尾拷贝节点的位置也被包含）** |

## 更新日志

* v1.13.0 `swiper`组件新增`pos-change`事件，`swiper-item`组件新增作用域插槽
* v1.8.0 新增`angle`属性
* v1.0.0 发布
