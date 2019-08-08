# tab 标签组件

> tab是一个标签组件，可自定义各子项的内容。

## 使用方法

```
<tab>
    <tab-item v-for="item in list">分类{{item}}</tab-item>
</tab>
```

```
import {Tab, TabItem} from 'vui';

export default {
    components: {
        Tab,
        TabItem
    },
    data: {
        list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
};
```

## 属性

|           名称           |           类型           | 必填  |                   默认值                    |                                                                                            描述                                                                                             |
| :----------------------: | :----------------------: | :---: | :-----------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|         v-model          |         `Number`         |  `Y`  |                     `-`                     |                                                                                    选中的item的index位置                                                                                    |
|         vertical         |        `Boolean`         |  `N`  |                   `false`                   |                                                                                        是否垂直方向                                                                                         |
|           auto           |        `Boolean`         |  `N`  |                   `true`                    |                                                                                   点击item时是否自动选中                                                                                    |
|          scroll          |        `Boolean`         |  `N`  |                   `true`                    |                                                                         当item过多导致溢出时，能否手动滚动item列表                                                                          |
|         showLine         |        `Boolean`         |  `N`  |                   `true`                    |                                                                                      是否显示指示线条                                                                                       |
|        lineUpside        |        `Boolean`         |  `N`  |                   `false`                   |                          为`true`时，如果`vertical`为`false`，表示线条在顶部，否则线条在左侧；为`false`时，如果`vertical`为`false`，表示线条在底部，否则线条在右侧                          |
|         lineSize         | `Number`&#124;`Function` |  `N`  |                     `1`                     | 指示线条的长度，值为`Number`类型时，表示线条的长度与选中item元素尺寸的比例，为`Function`类型时，接受一个index参数，需返回线条具体的像素长度，这通常用来为选择不同的item时设置不同的线条长度 |
|      lineAnimation       |         `String`         |  `N`  |                   `async`                   |                                   指示线条的动画类型，`none`表示切换时线条无过渡动画，`sync`表示线条过渡时两端同步移动，`async`表示线条过渡时两端异步移动                                   |
|         duration         |         `Number`         |  `N`  |                    `300`                    |                                                                                指示线条过渡动画时间，单位ms                                                                                 |
|       selectedAttr       |         `String`         |  `N`  | `data-selected`(v1.9.0以前为`vui-selected`) |                                                                 item选中时添加到item元素上的属性名，可以用来自定义选中效果                                                                  |
| stickyIndex**(v1.9.0+)** |         `Number`         |  `N`  |                    `-1`                     |               item索引，表示对哪个item应用粘性定位，`-1`表示不对任何item应用粘性定位。如果想要对选中的项进行粘性定位，只需要监控`v-model`的变化，然后修改`stickyIndex`就行了                |

## 事件

| 名称  |   参数    |               说明                |
| :---: | :-------: | :-------------------------------: |
| click | (`index`) | 点击item时触发，`index`为item位置 |

## 插槽

`tab`插槽

| 名称  | 必填  |      说明      |
| :---: | :---: | :------------: |
| 默认  |  `Y`  | `tab-item`列表 |

`tab-item`插槽

| 名称  | 必填  |         说明         |
| :---: | :---: | :------------------: |
| 默认  |  `Y`  | 具体的`tab-item`内容 |

**如果插槽的内容发生了变化，需要手动调用`tab`组件实例的`update`方法**

## 更新日志

* v1.9.0 新增`stickyIndex`属性
* v1.3.0 发布
