# track 埋点插件

> track是一个提供埋点指令的插件

## 使用方法

```
<div v-track="trackValue">xxx</div>
```

```
import Vue from 'vue'
import {PTrack} from 'vui';

Vue.use(PTrack, {
  name: 'track',  // 指令名称
  url: 'http://xxxx/xxx',   // 埋点上报url
  commonParams: {   // 公共参数
    model: 'xxx',
    project: 'xxx',
    ...
  },
  dynamicParams() {   // 动态公共参数
    return {
      time: Date.now(),
      ...
    }
  }
})

export default {
  data() {
    return {
      trackValue: [{
        type: 'pageload',
        params: {
          origin: 'xxx',
          id: 'xxx'
        }
      }, {
        type: 'click',
        params: {
          origin: 'xxx',
          id: 'xxx'
        }
      }, {
        type: 'expose',
        params: {
          origin: 'xxx',
          id: 'xxx'
        },
        options: {
          rootMargin: '20px 0',
          threshold: 0.1
        }
      }]
    }
  }
}
```

## 插件选项

名称|类型|必填|默认值|描述
:-:|:-:|:-:|:-:|:-:
name|`String`|`N`|`track`|提供的埋点指令的名称
url|`String`|`Y`|`-`|上报的url，只能包含路径部分，如`http://www.xxx.com/xxx/xx`
commonParams|`Object`|`N`|`-`|公共参数
dynamicParams|`Function`|`N`|`-`|生成动态公共参数的函数，比如可以生成每次上报时的时间戳等

## 指令值

指令值为对象或对象数组，对象属性如下

名称|类型|必填|默认值|描述
:-:|:-:|:-:|:-:|:-:
type|`String`|`Y`|`-`|埋点类型，目前只支持`create`、`click`、`expose`三种。`create`表示元素被创建时就会上报埋点，通常用来上报页面加载的埋点；`click`表示元素被点击时就会上报埋点，`expose`表示元素曝光时就会上报埋点
params|`Object`|`Y`|`-`|埋点参数对象
options|`Object`|`N`|与[IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/IntersectionObserver)默认配置一致|该参数只有`type`为`expose`时才可用，跟[IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/IntersectionObserver)的配置一致，只是这里的`options.threshold`只支持**单个**数值。当指令绑定的元素与`options.root`的交叉区域的比例大于`options.threshold`时表示元素曝光了，否则表示未曝光

**如果要修改指令的值，请确保修改前后的两个值不是同一个对象（即不是同一个对象引用），否则修改无法生效**

## 更新日志

* v1.4.0 发布