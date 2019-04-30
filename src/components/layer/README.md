# layer 蒙层

> layer是一个蒙层组件

## 使用方法

```
<layer v-model="show" :duration="duration" :background="background" :click-close="clickClose" :back-close="backClose" :prevent-close="preventClose">
    <div class="box">
        当前时间：{{Date.now()}}
    </div>
</layer>
```

```
import {Layer} from 'vui';

export default {
    components: {
        Layer
    }
};
```

## 属性

名称|类型|必填|默认值|描述
:-:|:-:|:-:|:-:|:-:
v-model|`Boolean`|`Y`|`-`|是否显示
background|`String`|`N`|`rgba(0,0,0,0.6)`|蒙层背景色
global|`Boolean`|`N`|`true`|是全局遮罩层还是某个元素的局部遮罩层，**如果为某个元素的遮罩层，会默认将组件父元素设置成相对定位**
clickClose|`Boolean`|`N`|`true`|点击蒙层**（非slot内容）**时是否自动关闭
backClose|`Boolean`|`N`|`true`|是否在显示layer时创建新的历史记录，返回时自动关闭layer而不后退页面
preventClose|`Boolean`|`N`|`false`|当`clickClose`、`backClose`为`true`时，是否阻止点击或者back自动关闭

`duration`、`appear`属性跟cutover组件一致

## 插槽

名称|必填|说明
:-:|:-:|:-:
默认|`Y`|内容区域

## 事件

名称|参数|说明
:-:|:-:|:-:
click|`(prevented)`|无论`clickClose`的值为什么，点击蒙层**（非slot内容）**时总会触发，`prevented`的值跟`preventClose`属性一致，可以在该事件中做阻止关闭的提示
back|`(prevented)`|当`backClose`属性为`true`并显示了layer组件时，点击back键时触发，`prevented`同上

## 更新日志

* v1.0.0 发布