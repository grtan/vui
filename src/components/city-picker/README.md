# city-picker 省市区选择器

> picker是一个省市区选择器，使用的[账户平台化](http://km.vivo.xyz/pages/viewpage.action?pageId=28480544&token=iIVODW0BekNrSG24IShFFAPeCr-VGp1yiRcjgZ7A(55d5FVXb99gFoBWGWVPMHbN2gXyu57Ha0s))提供的地址数据

## 使用方法

```
<div id="content">
    <button @click="show=!show">开关</button>
    <city-picker v-model="show" @update="update"></city-picker>
</div>
```

```
import {CityPicker} from 'vui';

export default {
    el: '#content',
    components: {
        CityPicker
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
selected|`Array`|`N`|`第一个省市区`|选中省市区的名称，如`['浙江省','杭州市','西湖区']`表示设置组件当前选中浙江省杭州市西湖区
filter|`Boolean`|`N`|`true`|是否过滤特殊地区，详见[账户平台化](http://km.vivo.xyz/pages/viewpage.action?pageId=28480544&token=iIVODW0BekNrSG24IShFFAPeCr-VGp1yiRcjgZ7A(55d5FVXb99gFoBWGWVPMHbN2gXyu57Ha0s))

`v-model`、`title`、`cancel`、`confirm`、`sync`、`enable3d`属性跟popup-picker组件一致

## 事件

`update`、`confirm`事件与popup-picker组件一致，**只是参数数组值不是选中值在该列的索引，而是省市区的名称，如`['浙江省','杭州市','西湖区']`**