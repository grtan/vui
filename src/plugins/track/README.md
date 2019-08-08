# track 埋点插件 (v1.4.0+)

> track 是一个提供埋点指令的插件，支持页面加载、元素点击、元素曝光埋点。

## 使用方法

```
<div v-track="trackValue" @track_expose="onExpose">xxx</div>
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
  },
  callback(params) { // 当不设置url时，自定义上报函数
    ...
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
  },
  methods: {
    onExpose(event) {
      const {directive, expose, options} = event.detail
      const root = options && options.root
      const rootMargin = options && options.rootMargin
      const threshold = options && options.threshold

      ...
    }
  }
}
```

## 插件选项

|         名称          |    类型    |         必填         | 默认值  |                                                              描述                                                               |
| :-------------------: | :--------: | :------------------: | :-----: | :-----------------------------------------------------------------------------------------------------------------------------: |
|         name          |  `String`  |         `N`          | `track` |                                          提供的埋点指令的名称，使用时需要加上`v-`前缀                                           |
|          url          |  `String`  | `N`(v1.9.0以前为`Y`) |   `-`   |                                   上报的url，只能包含路径部分，如`http://www.xxx.com/xxx/xx`                                    |
|     commonParams      |  `Object`  |         `N`          |   `-`   |                                                            公共参数                                                             |
|     dynamicParams     | `Function` |         `N`          |   `-`   |                                    生成动态公共参数的函数，比如可以生成每次上报时的时间戳等                                     |
| callback**(v1.9.0+)** | `Function` |         `N`          |   `-`   | 自定义上报函数，其接受一个参数，该参数为对象，包含了所有公共参数和具体的埋点参数。当使用自定义上报函数时，就不需要设置`url`选项 |

## 指令值

指令值为对象或对象数组，对象属性如下

|  名称   |   类型   | 必填  |                                                                   默认值                                                                    |                                                                                                                                                                 描述                                                                                                                                                                  |
| :-----: | :------: | :---: | :-----------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|  type   | `String` |  `Y`  |                                                                     `-`                                                                     |                                                                    埋点类型，目前只支持`create`、`click`、`expose`三种。`create`表示元素被创建时就会上报埋点，通常用来上报页面加载的埋点；`click`表示元素被点击时就会上报埋点，`expose`表示元素曝光时就会上报埋点                                                                     |
| params  | `Object` |  `Y`  |                                                                     `-`                                                                     |                                                                                                                                                             埋点参数对象                                                                                                                                                              |
| options | `Object` |  `N`  | 与[IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/IntersectionObserver)的默认`options`参数一致 | 该参数只有`type`为`expose`时才可用，跟[IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/IntersectionObserver)的`options`参数一致，只是这里的`options.threshold`只支持**单个**数值。当指令绑定的元素与`options.root`的交叉区域的比例大于`options.threshold`时表示元素曝光了，否则表示未曝光 |

**如果要修改指令的值，请确保修改前后的两个值不是同一个对象（即不是同一个对象引用），否则修改无法生效**

## 事件 (v1.7.0+)

|     名称     |                     参数                      |                                                                                                                      说明                                                                                                                      |
| :----------: | :-------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| track_expose | ({`detail`:{`directive`,`expose`,`options`}}) | 当埋点类型包含`expose`时，元素刚进入或者退出曝光区域时都会触发该事件，通常用来自定义曝光行为。`detail`为`event`事件对象的属性，`directive`为指令名称（不包含`v-`前缀），`expose`表示进入还是退出曝光区域，`options`与指令值的`options`字段一致 |

## 更新日志

- v1.9.0 插件选项新增`callback`属性
- v1.7.0 埋点类型为`expose`时新增`track_expose`事件
- v1.4.0 发布
