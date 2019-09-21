# translation 国际化 (v1.15.0+)

> translation 是一个生成国际化组件的插件，其采用[vue-i18n](https://kazupon.github.io/vue-i18n/zh/) v6.0+方案。

## 使用方法

```
<vui-translation ref="translation">
  <app></app>
</vui-translation>
```

```
import Vue from 'vue'
import {PTranslation} from 'vui'
import zhCN from 'vue/lib/lang/zh-CN'
import en from 'vue/lib/lang/en'

Vue.use(PTranslation, {
  name: 'vui-translation',  // 组件名称
  locale: 'zh-CN',   // 语言名称
  messages: {
    'zh-CN': {
      // 组件库的翻译，可以不用写，默认始终会包含中文
      ...zhCN['zh-CN'],
      // 非组件库的翻译
      app: {
        text1: '文本1',
        text2: '文本2'
      }
    },
    en: {
      ...en.en,
      app: {
        text1: 'text1',
        text2: 'text2'
      }
    }
  }
})

export default {
  ...
  methods: {
    changeTranslation() {
      // 国际化方案采用的vue-i18n，可以使用其支持的各种功能
      this.$refs.translation.$i18n.setLocaleMessage('language-name',{
        ... // 语言内容
      })
    }
  }
}
```

> `vui-translation`组件已经集成了`vue-i18n`，可以使用其支持的各种功能，但插槽只支持单个组件或元素。当组件库外的其他内容需要国际化时，只需要将国际化的语言内容合并就行了，无需再单独创建`vue-i18n`实例，如上面非组件库翻译那样。**目前组件库的`dialog`之类的插件还无法应用内置的国际化内容，需要用户自己定义**

```
<!-- 错误写法，只支持单个组件或元素 -->
<vui-translation ref="translation">
  <app1></app1>
  <app2></app2>
</vui-translation>

<!-- 错误写法，此时$t('path')的查找范围不在该vui-translation组件内 -->
<vui-translation ref="translation">
  <app>
    {{$t('path')}}
  </app>
</vui-translation>
```

## 插件选项

|      名称      |   类型   | 必填  |      默认值       |                                                                         描述                                                                          |
| :------------: | :------: | :---: | :---------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------: |
|      name      | `String` |  `N`  | `vui-translation` |                                                              生成的全局国际化组件的名称                                                               |
|     locale     | `String` |  `N`  |      `zh-CN`      |                                                                  当前选择的语言名称                                                                   |
| fallbackLocale | `String` |  `N`  |      `zh-CN`      |                                                                    回退语言的名称                                                                     |
|    messages    | `Object` |  `N`  |        `-`        | 各种语言的内容，始终会包含组件库的中文内容，[详情](https://kazupon.github.io/vue-i18n/zh/api/#%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0%E9%80%89%E9%A1%B9) |

> 插件选项还包含`vue-i18n`支持的[其他选项](https://kazupon.github.io/vue-i18n/zh/api/#%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0%E9%80%89%E9%A1%B9)。

目前已内置的语言

* 简体中文 (zh-CN)
* 英文 (en)

## 更新日志

- v1.15.0 发布
