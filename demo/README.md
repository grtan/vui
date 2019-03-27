
<h3>前端移动端通用脚手架2.0详细设计说明书</h3>

---

<h4>版本记录</h4>

| 时间       | 版本   | 提交人 | 描述                      |
| :--------- | :----- | :------ | :------------------------ |
| 2018.11.13 | v1.0.0 | 冯伟    | [+]初始版本               |
| 2018.11.16 | v1.0.1 | 张吉琪,冯伟      | [^]新增demo,bug修复|


[1.概述](#1)
　[1.1 下载安装](#1.1)
　[1.2 目录结构](#1.2)
　　　[1.2.1 vue指令文件](#1.2.1)
　　　[1.2.2 公共组件](#1.2.2)
　　　[1.2.3 全局组件数据状态管理文件](#1.2.3)
　　　[1.2.4 工具方法集合](#1.2.4)
[2.实战开发](#2)
　[2.1 编写一个页面](#2.1)
　[2.2 访问这个页面](#2.2)
　[2.3 请求服务端数据](#2.3)
　　[2.3.1 创建一个API](#2.3.1)
　　[2.3.2 API的使用方法](#2.3.2)
　[2.4 工具指令](#2.4)
　　[2.4.1 图片的处理](#2.4.1)
　　[2.4.2 埋点指令](#2.4.2)
　[2.5 打包发布](#2.4)
　　[2.5.1 测试环境打包](#2.5.1)
　　[2.5.2 线上环境打包](#2.5.2)
　　[2.5.3 本地调试](#2.5.3)
　　[2.5.4 本地代理](#2.5.4)
[3.项目规范](#3)
　[3.1 统一编辑器](#3.1)
　[3.2 页面尺寸转换( px to rem )](#3.2)
　[3.3 编码规范](#3.3)
　[3.4 代码提交规范](#3.4)

<h2 id='1'> 概述 </h2>

简单介绍了前端移动端通用项目模版的安装，开发和打包。

---

<h5 id='1.1'> 下载安装 </h5>

这是一个依赖npm包管理的工程，需要使用node的npm进行下载依赖相关资源包，并使用express起的一个web服务，所以本机需安装node。
```bash

#window环境，下面安装请忽略，Mac同学看过来
#node环境，我主张使用nvm来管理node，方便我们切换node版本
#https://github.com/creationix/nvm

#安装nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.4/install.sh | bash

#编辑当前用户的bash_profile
vi ~/.bash_profile

#增加环境变量
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm


#生效环境变量
source .bash_profile

#使用nvm命令，安装node
nvm --help

nvm install v6.3.0

#查看node版本
node -v


#进入项目目录
cd xx && yarn 

#启动开发环境
yarn dev
```


<h5 id='1.2'> 目录结构 </h5>
```bash
├── /public/       # 外部资源文件
├── /src/           # 项目源码目录
│ ├── /assets/      # 静态资源文件
│ ├── /api/         # 服务端API接口
│ ├── /directive/   # vue指令文件
│ ├── /mixins/      # vue混合插件文件
│ ├── /component/      # 公共组件
│ ├── /router/      # 路由组件
│ ├── /store/       # 全局组件数据状态管理文件
│ ├── /utils/       # 工具方法集合
│ ├── /views/       # 项目页面
│ ├── app.less      # 公共样式
│ ├── app.vue       # 入口vue文件
│ └── main.js       # 入口js文件
├── .browserslistrc #不同的前端工具之间共用目标浏览器和 node 版本的配置工具。
├── .eslintrc.js    # eslint配置文件
├── postcss.config.js   # postcss配置
├── babel.config.js # babel配置文件
├── .gitignore      # 忽略git上传文件
├── gulpfile.js     # gulp编译文件
├── index.html      # 编译项目的html
├── package.json    # 项目配置文件
├── serve.js        # 测试环境启动脚本
├── vue.config.js   # 可选的vue配置文件 会被 @vue/cli-service 自动加载

```

<h6 id='1.2.1'> vue指令文件 </h6>
```bash
│ ├── /directive/
│ │ ├── backFn.js   # 监听移动端返回键
│ │ ├── stat.js     # vue打点指令
│ │ ├── webp.js     # vue图像webp指定
│ │ ├── index.js    # 入口文件
```

<h6 id='1.2.2'> 公共组件 </h6>
```bash
│ ├── /component/
│ │ ├── Loading     # 全局Loading加载组件
│ │ ├── Error       # 全局错误组件
```

<h6 id='1.2.3'> 全局组件数据状态管理文件 </h6>
```bash
│ ├── /store/
│ │ ├── error       # 全局错误数据
│ │ ├── loading     # 全局loading状态
│ │ ├── scrollTop   # 首页滑动位置状态
│ │ ├── index.js    # 入口文件
```

<h6 id='1.2.4'> 工具方法集合 </h6>
```bash
│ ├── /utils/
│ │ ├── app.js       # Native信息和方法
│ │ ├── className.js # class样式操作方法
│ │ ├── fetch.js     # ajax封装方法
│ │ ├── toast.js     # toast封装方法
│ │ ├── tools.js     # 常用方法集合
│ │ ├── index.js     # 入口文件
```

<h2 id='2'> 实战开发 </h2>

编写一个模块。

---

<h5 id='2.1'> 编写一个页面 </h5>

我们来编写一个页面。

```bash
//脚手架生成
//在当前项目下执行命令
vivo new page account
```

或者我们也可以人肉创建

在views文件下，新增一个vue模块：account
```bash
│ ├── /view/
│ │ ├── account
│ │ │ ├── index.vue
```

如果你的编辑器是**vscode**,请在**首选择项->用户代码片段->vue**中添加以下代码，直接**index.vue**输入**vuec**,就可以生成vue初始模版。
```bash
 "Create vue template": {
        "prefix": "vuec",
        "body": [
            "<template>",
            "   <div class='' id=''>",
            "   Hello World !",
            "   </div>",
            "</template>",
            "<script>",
            "export default {",
            "  name: \"${1:component_name}\",",
            "  components:{",
            "      ",
            "    },",
            "  data () {",
            "    return {",
            "    };",
            "  },",
            "  methods:{",
            "    demo(){",
            "    }",
            "  },",
            "  mounted(){",
            "      ",
            "  }",
            "}",
            "</script>",
            "<style lang=\"${2:less}\">",
            "</style>"
        ],
        "description": "Create vue template"
    }
```


<h5 id='2.2'> 访问这个页面 </h5>

打开router下的index.js
```bash
│ ├── /router/
│ │ ├── index.js
```

index.js中加入这个路由的声明

```javascript
//webpack按需加载路由资源
//路由对象
let router = new Router({
   ...
   ...
  {
    path: '/account',               #访问页面的路径
    name: 'account',                #页面的名称
    component: () =>
      import(/* webpackChunkName: "home" */ '@/views/account/Index.vue')  #路由对应的组件
  }
   ...
   ...

})

```
添加完成后，打开浏览器，输入**http: //ip:port/#/account** 访问该页面。

<h5 id='2.3'> 请求服务端数据 </h5>

请求数据一般情况分为两种

<font color=linblue>1.页面初始化时，需要服务端数据支持展现</font>
vue请求页面初始化数据的时机，有两个生命周期的钩子

```javascript
//实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：
//数据观测 (data observer)
//属性和方法的运算
//watch/event 事件回调。
//然而，挂载阶段还没开始，$el 属性目前不可见
//总结：如果请求后，不依赖DOM的操作，可以放到这个钩子里，尽早的请求获得数据
created(){
   //...code
}
```

```javascript
//组件DOM已被挂载
//注意 mounted 不会承诺所有的子组件也都一起被挂载。
//如果你希望等到整个视图都渲染完毕，使用$nextTick
//总结：如果请求结束后，需要操作DOM，则放到这个钩子里，DOM的操作放到$nextTick中，保证一定存在
mounted(){
    this.$nextTick(function () {
    //所有视图更新完毕
    //...code
  })
}

```
<font color=linblue>2.用户交互时，需要和服务端传递数据</font>

```
使用方法方式，由触发的事件决定。
```



<h6>创建一个API</h6>
打开api文件夹，新增account.js文件,新增API，getInfo方法
```javascript

//api/account.js

//引入封装的fetch方法
import fetch from '../utils/fetch'
export default {
    //获取请绑定的用户信息
    getInfo(params) {
        return fetch({
            // prodUrl字段非必须， prodUrl存在时线上以此为请求地址
            prodUrl: 'https://video.vivo.com.cn/h5/shortvideo/detail',  
            url: '/api/account/getInfo.do',
            method: 'get',
            params
        });
    }
}

//api/index.js
//增加account入口
...
...
...
import account from './account'
export default {
  ...
  ...
  ..,
  account
}

```

<h6>API的使用方法</h6>
API直接返回result。若功能需要返回response信息，请设置getResData参数，接口将继续返回元数据。
```javascript
//view/account/index.vue
//created/mounted中调用getInfo方法
...
//引入API对象
import API from '@/api'
...

...
async mounted() {

    let res = await API.account.getInfo()
    let data = res.data
    this.$nextTick(() => {
    })
}

```



<h6>注意事项</h6>


**关于loading**
1.进入一个路由时，页面loading会自动显示隐藏，Utils工具类的**hiddenLoading**方法也能隐藏loading。

```js
//引用Utils对象
import Utils from '@/utils';
//一般业务代码使用不到这个方法
Utils.tools.hiddenLoading();
```
2.API封装的fetch方法，已经自动在请求开始时，打开全局loading,请求结束后，关闭全局loading,所以，如果你的页面依赖api请求，当请求回来后会关闭loading
3.如果你希望，你的api不触发系统loading，请加上 **noLoading:true** 这个参数，如下：
```javascript
API.account.getInfo({  noLoading: true }).then(...)
```
系统将不触发全局loading，具体效果由你决定。

---
**关于API的错误处理**

1.统一错误处理
该工程已经集成了统一错误处理页，如果API出错或页面不存在，会统一跳转到错误页。并从全局store中取出error的信息，展示在页面中。

2.自己处理错误信息
```javascript
API.account.getInfo({  acceptError: true  }).then(...)
```


<h5 id='2.4'> 工具指令 </h5>
<h6 id='2.4.1'>图片处理</h6>

1.webp指令
如果是assets静态资源目录下的图片，可以使用 v-webp 指令，该指令会自动判断浏览器环境是否支持webp，并切换到webp格式，如果webp格式不存在，则切换回正常格式文件。
v-webp直接赋值，该图片会作为背景图。
```javascript
 <img :src="require('@/assets/icon2/icon1.png')" v-webp>
 <div v-webp="require('@/assets/icon2/icon1.png')"></div>
```

2.生成webp图片参数
```javascript

//设置build文件夹下的webpack.base.conf
new ToWebPWebpackPlugin({
  //只匹配jpeg\jpg\png图片
  match: /(jpe?g|png)$/,
  //文件名包含.webp.会被转换webp格式
  srcContain: ".webp.",
  //文件大于1k,会被转换webp格式
  limit: 1024,
  //压缩质量
  webp: {
    quality: 75
  }
})
```

<h6 id='2.4.1'>埋点指令</h6>

```javascript
//动作埋点
//act:show为展示就发起埋点
//act:click为点击就发起埋点
 <div v-stat="{ 'act': 'click',params:{id:1,origin:1}}">立即使用</div>

//同一个元素不同触发埋点
<div v-stat="[{'act':'show', params:{origin:110}},{'act':'click', params:{origin:111}}]">立即使用</div>

 //非动作埋点
 //引入API对象
 import API from '@/api';
 //调用mark方法
 API.mark({ origin: 16 })

```

3.图片的引用

@符号的作用是直接指向src目录，好处是我们不用再多级目录里，写../../../去引用图片
```javascript
//普通引用
<img src="~@/assets/icon2/icon1.png">

//变量引用
let i = 1;
<img :src="require('@/assets/icon2/icon'+i+'.png')">

// in css:
.right {
  background: url('~@/assets/check.png') no-repeat;
}

```


<h5 id='2.5'> 打包发布 </h5>
<h6 id='2.5.1'>测试环境打包</h6>
```javascript
//通过集成jenkis，推送前端测试服务器，会自动代理后台服务器，提供测试服务
yarn testServer
```
<h6 id='2.5.2'>线上环境打包</h6>
```javascript
//将通过package.json里vivo参数中的prodZip来生成[name_md5.zip]静态资源包
yarn prod
```
<h6 id='2.5.3'>本地调试</h6>
```javascript
//开发环境
yarn  dev
```

<h6 id='2.5.4'>本地配置</h6>

```javascript
//vue.config.js

const pluginOptions = {
  //项目的名称，打包上线代码包名会使用该名称字段
  projectName: 'demo.vivo.com.cn',
  //域名host
  host: ip.address(),
  //本地服务的端口
  port: 8080,
  // 登录的地址，需要一个client_id
  loginPath: 'https://passport.vivo.com.cn/v3/web/login/authorize?client_id=xx',
  // 埋点上报的地址
  stPath: 'https://xxx.vivo.com.cn',
  //上线后cdn的地址
  cdnPath: 'xxx',
  //是否显示调试按钮
  useDebug: process.env.NODE_ENV === 'development'
}
```
<h2 id='3'> 项目规范 </h2>

---

<h6 id='3.1'>统一编辑器、开发环境</h6>
#####统一使用  ``vscode``  来开发代码。
#####必装的插件
- vetur
- eslint
- vue
- path Intellisense
#####必须的设置 vscode->首选项->设置
```json
{
	// Place your settings in this file to overwrite the default settings
	"workbench.iconTheme": "vscode-icons",
	"workbench.colorTheme": "Atom One Dark",
	"path-intellisense.extensionOnImport": true,
	"editor.fontSize": 13,
	"editor.tabSize": 2,
	"workbench.editor.enablePreview": false,
	"vetur.format.defaultFormatter.html": "js-beautify-html",
	"window.zoomLevel": 0,
	"workbench.sideBar.location": "left",
	"emojisense.languages": {
		"markdown": true,
		"git-commit": false,
		"plaintext": false,
		"json": true,
		"vue": true,
		"js": true,
	},
	"explorer.confirmDragAndDrop": false,
	"editor.formatOnSave": true,
	"emmet.includeLanguages": {
		"vue-html": "html",
		"vue": "html"
	},
	"files.associations": {
		"*.vue": "vue",
		"*.mix": "vue",
		"*.ux": "html",
		"*.ejs": "html"
	},
	"eslint.autoFixOnSave": true,
	"eslint.validate": [
		{
			"language": "vue",
			"autoFix": true
		},
		{
			"language": "javascript",
			"autoFix": true
		},
		"html",
		"vue"
	],
	"vetur.format.defaultFormatter.js": "none",
	"files.exclude": {
		"**/.svn": true,
		"**/.hg": true,
		"**/.DS_Store": true,
		"**/.sass-cache": true,
		"**/.vscode": true,
		"**/node_modules": false
	},
	"workbench.startupEditor": "newUntitledFile",
	"extensions.ignoreRecommendations": false,
	"vsicons.dontShowNewVersionMessage": true,
}

```

<h6 id='3.2'>页面尺寸转换( px to rem )</h6>

```html
<!--index.html中data-width填入设计图尺寸 -->
<html data-width=xxx>
<!--或直接修改/static/js/common/page-scale.js尺寸设置-->
var designScale = (documentEl.dataset.width || 1080) / 100
```
当设计图中标注一个元素的尺寸宽度是125时，代码直接填入<code>width:125px</code>即可。脚手架会在编译时，自动为你转化。
特殊元素比如边框线条或高度为1px时，此时脚手架会自动将其转化为0.01rem,导致页面无法观察到。此时1px则无需转换为rem单位。PX需要写成大写，则不会被脚手架转换。写法如下：

```css
.class-1 {
   border: 1PX solid #ddd;
}

//使用less情况下
.class-2 {
   border: unit(1,PX) solid #ddd;
}
.class-3 {
   border: ~"1PX" solid #ddd;
}
```

<h6 id='3.3'>编码规范</h6>

详细编码规范参考

[前端规范说明](http://10.101.15.109:4567/topic/64/%E6%8B%9F%E5%AE%9A%E5%89%8D%E7%AB%AF%E4%BB%A3%E7%A0%81%E8%A7%84%E8%8C%83)

<h6 id='3.4'>代码提交规范</h6>
该脚手架集成了监控git提交hook的功能，如果项目代码包含警告或错误将会终止提交，希望大家在日常开发过程中严格按照规范开发项目，提升项目代码的强壮性和整洁性。
特殊情况可使用下面注释来忽略警告。

- 忽略块
/* eslint-disable */
- 忽略行
// eslint-disable-next-line



---


enjoy ！
