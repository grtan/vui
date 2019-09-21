# switch 开关

> switch是一个开关组件，支持常规风格和`funtouch os 9`风格

## 使用方法

```
<vui-switch v-model="checked" :background-colors="[color1,color2]" :disabled="disabled" :prevent="prevent"
            @change="change" @click="click"></vui-switch>
```

```
import {Switch} from 'vui';

export default {
    components: {
        VuiSwitch: Switch
    }
};
```

## 属性

|                    名称                    |   类型    | 必填  |                              默认值                              |                           描述                            |
| :----------------------------------------: | :-------: | :---: | :--------------------------------------------------------------: | :-------------------------------------------------------: |
|                  v-model                   | `Boolean` |  `Y`  |                               `-`                                |                         是否选中                          |
|             type**(v1.15.0+)**             | `String`  |  `N`  |                            `default`                             | `default`表示默认风格，`funtouch9`表示`funtouch os 9`风格 |
|         borderColor**(v1.15.0+)**          | `String`  |  `N`  |                            `#dfdfdf`                             |       **只对默认风格有效**，表示off状态时的边框颜色       |
|         circleColor**(v1.15.0+)**          | `String`  |  `N`  |                              `#fff`                              |                        圆圈的颜色                         |
| backgroundColors**(v1.15.0以前为`color`)** |  `Array`  |  `N`  | `['#f0f0f0', '#456fff']`**(v1.15.0以前为`['#fff', '#456fff']`)** |  第一个表示off状态时的背景色，第二个表示on状态时的背景色  |
|           duration**(v1.15.0+)**           | `Number`  |  `N`  |                              `300`                               |                  切换时过渡时间，单位ms                   |
|                  disabled                  | `Boolean` |  `N`  |                             `false`                              |                         是否禁用                          |
|                  prevent                   | `Boolean` |  `N`  |                             `false`                              |                点击时是否阻止默认切换行为                 |

## 事件

|  名称  |   参数    |                                           说明                                           |
| :----: | :-------: | :--------------------------------------------------------------------------------------: |
| change | `{value}` |                              切换时触发，value为切换后的值                               |
| click  | `{value}` | 未禁用的状态下点击时触发，value为点击时的当前值。通常当`prevent`为true时用来进行二次确认 |

## 更新日志

* v1.15.0 支持`funtouch os 9`的风格，新增`type`、`borderColor`、`circleColor`、`duration`属性
* v1.0.0 发布
