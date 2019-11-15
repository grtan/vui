# cutover 元素切换动画

> cutover 为元素切换过渡动画组件，可支持多种效果，且可自定义过渡动效。

## 使用方法

```
<!--单个元素切换-->
<cutover type="cover">
  <div v-show="show">元素内容</div>
</cutover>

<!--多个元素切换-->
<cutover type="cover">
  <div key="1" v-if="value===1">元素内容</div>
  <div key="2" v-else-if="value===2">元素内容</div>
  <div key="3" v-else>元素内容</div>
</cutover>

<!--页面切换-->
<cutover type="my">
  <router-view></router-view>
</cutover>
```

```
import {Cutover} from 'vui';

export default {
  components: {
    Cutover
  }
};
```

```
/*自定义页面转场效果*/
.vui-cutover .vui-cutover-my-enter-active,
.vui-cutover .vui-cutover-my-leave-active {
  transition-property: opacity, transform;
}

.vui-cutover:not([data-back]) .vui-cutover-my-enter {
  transform: translate3d(100%, 0, 0);
}

.vui-cutover:not([data-back]) .vui-cutover-my-leave-active {
  opacity: .5;
}

/*checkBack为true时，返回时会在组件根元素应用data-back属性（v1.5.1之前为vui-back）*/
.vui-cutover[data-back] .vui-cutover-my-enter {
  opacity: .5;
}

.vui-cutover[data-back] .vui-cutover-my-leave-active {
  position: relative;
  z-index: 1;
  transform: translate3d(100%, 0, 0);
}
```

## 属性

|         名称          |   类型    | 必填  | 默认值  |                                                                          描述                                                                          |
| :-------------------: | :-------: | :---: | :-----: | :----------------------------------------------------------------------------------------------------------------------------------------------------: |
|         type          | `String`  |  `N`  | `fade`  | 过渡动画类型，目前支持 `fade`、`cover`、`popup-up`、`popup-down`、`popup-left`、`popup-right`、`slide-hz`**(v1.10.0+)**、`slide-vt`**(v1.10.0+)** 类型 |
|       duration        | `Number`  |  `N`  |  `300`  |                               过渡时间，单位 ms，`0`表示无过渡效果。**如果`type`应用的类型并没有过渡，请将该值设置为0**                                |
|       checkBack       | `Boolean` |  `N`  | `false` |                         **当作页面转场动画时，返回时动效是否相反，且此时要配合 vue-router 使用，其它场景使用时不要设置该属性**                         |
|        appear         | `Boolean` |  `N`  | `false` |                                                                 初始渲染是否有过渡效果                                                                 |
|         mode          | `String`  |  `N`  |   `-`   |                                      控制元素切换时进入、离开的顺序，有效的模式有`out-in`和`in-out`，默认同时生效                                      |
| disabled**(v1.1.0+)** | `Boolean` |  `N`  | `false` |                                 是否禁用过渡效果。比如不想要首页有转场效果时，就可以在首页禁用，等首页加载完后取消禁用                                 |

**当使用`checkBack`功能时，在单页应用内如果需要使用 replace 来切换内部页面，请使用 vue-router 的 replace 功能，而不要使用 location.replace 或者 history.replaceState**

## 插槽

| 名称  | 必填  |     说明     |
| :---: | :---: | :----------: |
| 默认  |  `Y`  | 要切换的元素 |

## 更新日志

* v1.15.2 修复第一个过渡元素高度为`0`时样式错乱、`duration`为`0`时依然应用过渡效果导致闪烁的问题
* v1.10.0 `type`新增`slide-hz`和`slide-vt`类型
* v1.5.1 修复过渡时偶现 margin-left 被过渡的问题
* v1.1.0 新增`disabled`属性
* v1.0.0 发布
