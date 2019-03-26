# picker 选择器

> picker是一个选择器**(支持响应式功能，即组件或容器尺寸变化时，组件能自适应)**

## 使用方法

```
<div class="box">
    <picker :data="data" :selected="selected" :enable3d="enable3d" :sync="sync"
            @update="update"></picker>
</div>
```

```
import {Picker} from 'vui';

export default {
    components: {
        Picker
    },
    data: {
        data: function () {
              var data = [];

              for (var i = 0; i < 3; i++) {
                  data.push({
                      name: 'label' + i,
                      options: function () {
                          var arr = [], i = 0;

                          for (; i < 60; i++) {
                              arr.push(i);
                          }

                          return arr;
                      }()
                  })
              }

              return data;
          }(),
        selected: [0, 0, 0],
        enable3d: false,
        sync: false
    },
    methods: {
        update(value){
            console.log(value);
        }
    }
};
```

## 属性

名称|类型|必填|默认值|描述
:-:|:-:|:-:|:-:|:-:
data|Array或Object|`Y`|`-`|数据
selected|Array|`N`|`[0,0,...]`|设定当前各列选中的子项位置，比如有3列，则[0,0,0]表示3列都选中第一个子项
sync|`Boolean`|`N`|`false`|列滚动时是否立即更新值
enable3d|`Boolean`|`N`|`false`|是否开启3d旋转

data为Array时（**非级联关系**）如下

名称|类型|必填|默认值|描述
:-:|:-:|:-:|:-:|:-:
data[{name}]|String|N|-|列名称，没有则不显示列名称
data[{options}]|Array|Y|-|列数据，每一项为字符串

例如

```
[{
    name: '年',
    options: [1, 2, 3, 4, 5, 6]
}, {
    name: '月',
    options: [1, 2, 3, 4, 5, 6]
}, {
    name: '日',
    options: [1, 2, 3, 4, 5, 6]
}]
```

data为Object时（**级联关系**）如下

名称|类型|必填|默认值|描述
:-:|:-:|:-:|:-:|:-:
{name}|String|N|-|列名称，没有则不显示列名称（**要么所有的列都有名称，要么都没有名称**）
{options}|Array|Y|-|列数据，每一项为对象
{options{value}}|String|Y|-|每一项的数据
{options{children}}|Object（**重复data结构**）|N|-|级联子列的配置，没有则无子列

例如

```
{
    name: '年',
    options: [{
        value: 2016,
        children: {
            name: '月',
            options: [{
                value: 11,
                children: {
                    name: '日',
                    options: [1, 2, 3, 4, 5, 6]
                }
            }, {
                value: 12,
                children: {
                    name: '日',
                    options: [1, 2, 3, 4, 5, 6]
                }
            }]
        }
    }, {
        value: 2017,
        children: {
            name: '月',
            options: [{
                value: 11,
                children: {
                    name: '日',
                    options: [1, 2, 3, 4, 5, 6]
                }
            }, {
                value: 12,
                children: {
                    name: '日',
                    options: [1, 2, 3, 4, 5, 6]
                }
            }]
        }
    }]
}
```

## 事件

名称|参数|说明
:-:|:-:|:-:
update|`{value}`|数据更新（**非级联关系时，只要任一列选择的数据改变；级联关系时，最后一列选择的数据改变**）时触发（组件初始化时也会触发），value是一个数组，元素依次为各列选中子项的位置索引