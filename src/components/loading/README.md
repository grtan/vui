# loading 加载提示组件

> loading是一个加载提示组件

## 使用方法

```
<div>
    <loading :show="show">
        <!--加载图标-->
        <img src="https://loading.io/spinners/spinner/thumb.png">
        <span>正在加载...</span>
    </loading>
    <div>内容</div>
</div>
```

```
import {Loading} from 'vui';

export default {
    components: {
        Loading
    }
};
```

## 属性

名称|类型|必填|默认值|描述
:-:|:-:|:-:|:-:|:-:
show|`Boolean`|`Y`|`-`|是否显示
layer|`Boolean`|`N`|`true`|是否有遮罩层
background|`String`|`N`|`#fff`|遮罩层背景色

`global`属性跟layer组件一致

## 插槽

名称|必填|说明
:-:|:-:|:-:
默认|`N`|loading提示内容

## 更新日志

* v1.0.0 发布