# cutover 元素切换动画

> cutover为元素切换过渡动画组件，可支持多种效果，且可自定义过渡动效。

## 使用方法

```
<!--单个元素切换-->
<cutover type="cover">
  <div v-show="show">元素内容</div>
</cutover>

<!--多个元素切换-->
<cutover type="cover">
  <div v-if="value===1">元素内容</div>
  <div v-else-if="value===2">元素内容</div>
  <div v-else>元素内容</div>
</cutover>

<!--页面切换-->
<cutover type="my">
  <router-view :style="slot.styleObj"></router-view>
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

.vui-cutover:not([vui-back]) .vui-cutover-my-enter {
  transform: translate3d(100%, 0, 0);
}

.vui-cutover:not([vui-back]) .vui-cutover-my-leave-active {
  opacity: .5;
}

/*checkBack为true时，返回时会在组件根元素应用vui-back属性*/
.vui-cutover[vui-back] .vui-cutover-my-enter {
  opacity: .5;
}

.vui-cutover[vui-back] .vui-cutover-my-leave-active {
  position: relative;
  z-index: 1;
  transform: translate3d(100%, 0, 0);
}
```

## 属性

名称|类型|必填|默认值|描述
:-:|:-:|:-:|:-:|:-:
type|`String`|`N`|`fade`|过渡动画类型，目前支持fade、cover、popup-up、popup-down、popup-left、popup-right类型
duration|`Number`|`N`|`400`|过渡时间，单位ms，`0`表示无过渡效果
checkBack|`Boolean`|`N`|`false`|**当作页面转场动画时，返回时动效是否相反，且此时要配合vue-router使用，其它场景使用时不要设置该属性**
appear|`Boolean`|`N`|`false`|初始渲染是否有过渡效果
mode|`String`|`N`|`-`|控制元素切换时进入、离开的顺序，有效的模式有`out-in`和`in-out`，默认同时生效

**当使用`checkBack`功能时，在单页应用内如果需要使用replace来切换内部页面，请使用vue-router的replace功能，而不要使用location.replace或者history.replaceState**

## 插槽

名称|必填|说明
:-:|:-:|:-:
默认|`Y`|要切换的元素