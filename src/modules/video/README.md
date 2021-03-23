# Video 视频播放器

> 通用视频播放组件，支持点播和直播，同时支持自适应多码率 hls 视频流和多视频源切换。

## 使用方法

```vue
<template>
  <vui-video :src=""></vui-video>
</template>

<script>
import { Video } from '@game/vui';

export default {
  components: {
    VuiVideo: Video
  },
  data() {
    // 自适应多码率hls视频，支持平滑切换
    return {
      src: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
      type: 'application/x-mpegURL'
    }

    // 多视频源，不支持平滑切换
    // return [{
    //   src: 'https://valipl.cp31.ott.cibntv.net/657241CC43B34715D69DA2FEE/03000600006046477257A882B30C08D986F399-A1D0-4D8A-8F28-3C2F33499BE6-1-2591832.m3u8?ccode=0502&duration=3036&expire=18000&psid=949b9398849c206b26155e7573cda3d647e30&ups_client_netip=7ca03cac&ups_ts=1616411465&ups_userid=&utid=PsKnF%2FxfPQICAXygPKzKaiHm&vid=XNTAzNDM2MDY5Ng&vkey=B61aeabb0df825b5c56dd37b9a09fe74d&sm=1&operate_type=1&dre=u37&si=73&eo=0&dst=1&iv=0&s=1e61efbfbdefbfbd04ef&type=mp4hdv3&bc=2&hotvt=1&t=a820ba5cd40c3c&rid=200000002564A4378E9C4DB1BC8C29D94CC60FBA02000000',
    //   type: 'application/x-mpegURL',
    //   label: '540P'
    // }, {
    //   src: 'https://valipl.cp31.ott.cibntv.net/67747340DFF30714202316908/03000700006046477257A882B30C082949FE14-AB0E-473A-BC95-0DCA16509D0C-1-2591832.m3u8?ccode=0502&duration=3036&expire=18000&psid=98b3d5149fb9b85cf210734e4f54d79347e30&ups_client_netip=7c5a2b56&ups_ts=1616411787&ups_userid=736553226&utid=PsKnF%2FxfPQICAXygPKzKaiHm&vid=XNTAzNDM2MDY5Ng&vkey=B54cdce0fb285571f4b32a6327b356398&sm=1&operate_type=1&dre=u37&si=73&eo=0&dst=1&iv=0&s=1e61efbfbdefbfbd04ef&type=mp4hd2v3&bc=2&hotvt=1&t=d9f0e3dee83209&rid=200000001A59D8B145FF6DB40B9B3196FD2092AA02000000',
    //   type: 'application/x-mpegURL',
    //   label: '720P'
    // }]
  }
  ...
};
</script>
```

## 属性

|   名称   |                                                                         类型                                                                         | 必填 | 默认值  |                                                             描述                                                             |
| :------: | :--------------------------------------------------------------------------------------------------------------------------------------------------: | :--: | :-----: | :--------------------------------------------------------------------------------------------------------------------------: |
|   src    | `string` &#124; `{src: string; type?: string; label?: string; size?: number}` &#124; `{src: string; type?: string; label?: string; size?: number}[]` | `Y`  |   `-`   | 视频源信息，src 为视频 url，type 为文件 mime 类型，label 为要显示的分辨率名称，size 为对应分辨率文件的总尺寸大小，单位字节。 |
| autoplay |                                                 `boolean` &#124; `muted` &#124; `play` &#124; `any`                                                  | `N`  | `false` |         自动播放设置，与 videojs 的 [options.autoplay](https://docs.videojs.com/tutorial-options.html#autoplay)一致          |
|   loop   |                                                                      `boolean`                                                                       | `N`  | `false` |             循环播放设置，与 videojs 的 [options.loop](https://docs.videojs.com/tutorial-options.html#loop)一致              |
|  muted   |                                                                      `boolean`                                                                       | `N`  | `true`  |          初始播放是否静音，与 videojs 的 [options.muted](https://docs.videojs.com/tutorial-options.html#muted)一致           |
| preload  |                                                        `auto` &#124; `metadata` &#124; `none`                                                        | `N`  | `none`  |           预加载设置，与 videojs 的 [options.preload](https://docs.videojs.com/tutorial-options.html#preload)一致            |
|  poster  |                                                                       `string`                                                                       | `N`  |   `-`   |            视频封面图，与 videojs 的 [options.poster](https://docs.videojs.com/tutorial-options.html#poster)一致             |
| controls |                                                                      `boolean`                                                                       | `N`  | `true`  |       是否显示操作控件，与 videojs 的 [options.controls](https://docs.videojs.com/tutorial-options.html#controls)一致        |
| options  |                                                                       `object`                                                                       | `N`  |   `-`   |                      videojs 的其他 [options](https://docs.videojs.com/tutorial-options.html) 属性设置                       |
|  title   |                                                                       `string`                                                                       | `N`  |   `-`   |                                                           视频标题                                                           |

## 注意

本组件只暴露了一些通用配置属性，如果需要进行复杂的操作，可以获取`vm.player`实例进行自定义。

## 作者

谭新 <xin.tan@vivo.com>

## 更新日志

- v2.5.0 发布
