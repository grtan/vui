# cache 页面缓存

> cache是一个页面缓存组件，需要配合vue-router使用，通常用来实现类似native app那种前进刷新页面、后退使用页面缓存的效果，并且支持自定义配置。

## 使用方法

```
<cache>
  <router-view></router-view>  
</cache>

<!--与cutover配合使用-->
<cutover>
  <cache>
    <router-view></router-view>
  </cache>
</cutover>
```

```
import {Cache} from 'vui';

export default {
  components: {
    Cache
  }
};
```

## 属性

名称|类型|必填|默认值|描述
:-:|:-:|:-:|:-:|:-:
type|`String`|`N`|`all`|缓存类型，`all`表示点击浏览器前进、后退按钮时都显示页面缓存，`back`表示只有后退时才显示页面缓存，`forward`表示只有前进时才显示页面缓存，`none`表示路由切换时始终创建新的页面实例，而不显示缓存
exclue|`Array<String>`|`N`|`[]`|页面路由名称的数组，表示这些页面始终创建新的实例，不显示缓存
forceUpdate|`Boolean`|`N`|`false`|所有页面强制创建新的实例，而不显示缓存，可以用来实现自定义缓存逻辑

**在单页应用内如果需要使用replace来切换内部页面，请使用vue-router的replace功能，而不要使用location.replace或者history.replaceState。被cache包裹的组件也有`activated`和`deactivated`生命周期钩子，跟`keep-alive`一致。**

## 插槽

名称|必填|说明
:-:|:-:|:-:
默认|`Y`|路由视图，写死`<router-view></router-view>`

## 更新日志

* v1.0.1 组件render时区分是路由变化还是其他原因引起的，解决缓存复用错乱的问题
* v1.0.0 发布
