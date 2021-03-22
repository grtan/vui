# Video 视频播放器

> 这里输入描述

## 使用方法

```vue
<template>
  <vui-video v-model="show" :title="title" @btn-click="onBtnClick"> 内容内容 </vui-video>
</template>

<script>
import { Video } from '@game/vui';

export default {
  components: {
    VuiVideo: Video
  },
  ...
};
</script>
```

## 属性

|   名称   |                                          类型                                          | 必填 | 默认值  |                                                      描述                                                       |
| :------: | :------------------------------------------------------------------------------------: | :--: | :-----: | :-------------------------------------------------------------------------------------------------------------: |
|   src    | `string` &#124; `{src: string; type?: string}` &#124; `{src: string; type?: string}[]` | `Y`  |   `-`   |                                        视频源 url，type 为文件 mime 类型                                        |
| autoplay |                  `boolean` &#124; `muted` &#124; `play` &#124; `any`                   | `N`  | `false` |   自动播放设置，与 videojs 的 [options.autoplay](https://docs.videojs.com/tutorial-options.html#autoplay)一致   |
|   loop   |                                       `boolean`                                        | `N`  | `false` |       循环播放设置，与 videojs 的 [options.loop](https://docs.videojs.com/tutorial-options.html#loop)一致       |
|  muted   |                                       `boolean`                                        | `N`  | `true`  |    初始播放是否静音，与 videojs 的 [options.muted](https://docs.videojs.com/tutorial-options.html#muted)一致    |
| preload  |                         `auto` &#124; `metadata` &#124; `none`                         | `N`  | `none`  |     预加载设置，与 videojs 的 [options.preload](https://docs.videojs.com/tutorial-options.html#preload)一致     |
|  poster  |                                        `string`                                        | `N`  |   `-`   |      视频封面图，与 videojs 的 [options.poster](https://docs.videojs.com/tutorial-options.html#poster)一致      |
| controls |                                       `boolean`                                        | `N`  | `true`  | 是否显示操作控件，与 videojs 的 [options.controls](https://docs.videojs.com/tutorial-options.html#controls)一致 |
| options  |                                        `object`                                        | `N`  |   `-`   |                videojs 的其他 [options](https://docs.videojs.com/tutorial-options.html) 属性设置                |
|  title   |                                        `string`                                        | `N`  |   `-`   |                                                    视频标题                                                     |

## 插槽

| 名称 | 必填 | 说明 |
| :--: | :--: | :--: |
| 默认 | `Y`  | xxx  |

## 事件

| 名称 |      参数      | 说明 |
| :--: | :------------: | :--: |
| xxx  | `(arg1, arg2)` | xxx  |

## 注意

**这里填写注意事项**

## 作者

谭新 <xin.tan@vivo.com>

## 更新日志

- v1.0.0 发布
- v1.0.1 修复 xx bug
- v1.1.0 新增 xx 功能
