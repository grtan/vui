# upload 上传

> upload是一个文件上传组件

## 使用方法

```
<upload 
  :action="host" 
  :onProgress="onProgress" 
  :onSuccess="onSuccess"
>
  <vui-button>上传文件</vui-button>
</upload>
```
```
<upload 
  :action='host'
  :onSuccess='onSuccess'
  :onProgress='onProgress'
  :onError='onError'
  :dragAndDrop='Boolean(true)'
>
  <div>
    <Icon type='download' />
    <p>点击或拖动文件至此上传</p>
  </div>
</upload>
```

```
import {Upload} from 'vui';

export default {
  components: {
    Upload,
  }
};
```

## 属性

名称|类型|必填|默认值|描述
:-:|:-:|:-:|:-:|:-:
action|`String`|`Y`|`''`|文件上传服务器地址,必填
accept|`String`|`N`|`*`|接受上传的文件类型, [详见 input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)
multiple|`Boolean`|`N`|`false`|是否支持多选文件，`ie10+` 支持。开启后按住 ctrl 可选择多个文件
dragAndDrop|`Boolean`|`N`|`false`|是否支持拖拽上传文件
limitSize|`Number`|`N`|`100*1024*1024`|单个文件大小限制，默认100M
beforeUpload|`Function`|`N`|无|(blob)=>{},上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传该文件
showUploadList|`Boolean`|`N`|`true`|是否显示上传文件列表
onProgress|`Function`|`N`|无|(file,fileList)=>file.progress,上传进度回调
onSuccess|`Function`|`N`|无|(file,fileList)=>file.response,上传成功回调
onError|`Function`|`N`|无|(file,fileList,error)=>file.status,上传错误回调
customRequest|`Function`|`N`|无|通过覆盖默认的上传行为，可以自定义自己的上传实现,参数为选择的文件


## 更新日志

* v1.0.0 发布
