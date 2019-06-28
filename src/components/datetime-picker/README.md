# datetime-picker 日期时间选择器

## 使用方法

```
<div id="content">
    <button @click="show=!show">开关</button>
    <datetime-picker v-model="show" @update="update"></datetime-picker>
</div>
```

```
import {DatetimePicker} from 'vui';

export default {
    el: '#content',
    components: {
        DatetimePicker
    },
    data: {
        show: false
    },
    methods: {
        update(values) {
            console.log(values)
        }
    }
};
```

## 属性

名称|类型|必填|默认值|描述
:-:|:-:|:-:|:-:|:-:
format|`String`|`N`|`YYYY-MM-DD`|显示的时间格式，YYYY-MM-DD HH:mm:ss、YYYY-MM-DD
startDate|`String`|`N`|`2010-01-01`|开始日期
endDate|`String`|`N`|`2030-12-31`|结束日期
title|`String`|`N`|`选择日期`|弹窗标题，可设置为空

`v-model`、`cancel`、`confirm`、`sync`、`enable3d`属性跟popup-picker组件一致

## 事件

`update`、`confirm`事件与popup-picker组件一致，**只是参数数组值不是选中值在该列的索引

## 更新日志

* v1.0.0 发布