# ajax 数据请求

> ajax数据请求方法

## 使用方法

```
import {ajax} from 'vui'

ajax({
  url: 'http://xxx/xx',
  type: 'get',
  params: {
    name: 'xxx',
    age: 'xxx'
  },
  success(result,status,xhr) => {
  },
  error(xhr,status,error) => {
  },
  complete(xhr,status) => {
  }
})
```

## 参数

名称|类型|必填|默认值|描述
:-:|:-:|:-:|:-:|:-:
url|`String`|`Y`|`-`|请求url
type|`String`|`N`|`get`|请求方法，支持`get`，`post`
params|`Object`|`N`|`-`|请求参数
dataType|`String`|`N`|`json`|期望响应数据类型，跟xhr.responseType支持的类型一致
async|`Boolean`|`N`|`true`|是否异步请求
timeout|`Number`|`N`|`0`|超时时间，单位ms，默认为0，即没有超时
success(data,status,xhr)|`Function`|`N`|`-`|成功回调函数，`data`为返回数据，`status`为状态（`success`，`notmodified`，`error`，`timeout`，`abort`或者`parsererror`），xhr为请求对象
error(xhr,status,error)|`Function`|`N`|`-`|失败回调函数，xhr、status同上，error为http状态文本（`OK`、`Not Found`等）
complete(xhr,status)|`Function`|`N`|`-`|请求完成回调函数，成功或者失败回调之后调用，xhr、status同上

## 更新日志

* v1.0.0 发布