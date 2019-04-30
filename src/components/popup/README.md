# popup 弹层

> popup是一个弹层组件

## 使用方法

```
<popup v-model="show" :direction="direction" :layer="layer" :global="global" :click-close="clickClose"
               :back-close="backClose" :prevent-close="preventClose" @click="onclick" @back="onback">
    <span @click="show=!show">❌</span>
    <div class="box">这是内容</div>
</popup>
```

```
import {Popup} from 'vui';

export default {
    components: {
        Popup
    }
};
```

## 属性

名称|类型|必填|默认值|描述
:-:|:-:|:-:|:-:|:-:
direction|`String`|`N`|`up`|弹层的弹出的方向，支持`up`,`down`,`left`,`right`四个方向

`v-model`、`background`、`global`、`clickClose`、`backClose`、`preventClose`、`duration`、`appear`属性跟layer组件一致

`layer`属性跟loading组件一致

## 插槽

名称|必填|说明
:-:|:-:|:-:
默认|`Y`|内容区域

## 事件

跟`layer`组件一致

## 更新日志

* v1.0.0 发布