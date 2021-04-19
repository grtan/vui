# 开发指南

**强制**使用类似`npm`和`yarn`的包管理工具[pnpm](https://pnpm.js.org/en/)来进行依赖管理，需要执行`npm i -g pnpm`进行全局安装。`pnpm`有如下优点

1. 相比于 npm、yarn 尽可能的将 package 放到 root level，pnpm 则是只将显式写明的依赖写入 root-level 的 node_modules，这避免了业务里错误的引入隐式依赖的问题
2. 不会存在依赖的模块相同版本被安装多份的问题，避免了相同版本模块的单例模式被破坏的问题
3. 同一个版本的依赖包在电脑上只会全局存在一份，其他地方全部采用硬链接的方式实现访问，大大节省了磁盘空间

参考

- [为什么我们应该使用 pnpm](https://segmentfault.com/a/1190000013214927)
- [node_modules 困境](https://zhuanlan.zhihu.com/p/137535779)

## clone 仓库

```bash
git clone git@gitlab.vmic.xyz:game-common/vui.git
```

## 安装依赖

```bash
pnpm i
```

## 创建模块

```bash
pnpm run create
```

![create](./image/create.png)

执行命令自动创建模块后，会自动更新 demo、文档等配置文件，开发者只需要编写对应模块的代码、demo 和文档，代码采用`ts`进行编写。

## 删除模块

```bash
pnpm run delete
```

![delete](./image/delete.png)

## 预览 demo

```bash
cd demo
npm i
npm run serve
```

进入到 demo 目录下执行`npm run serve`命令就可以实时预览 demo 效果，开发者修改模块 demo 目录下的代码会实时同步预览，也方便用来进行开发预览。

## 预览文档

```bash
pnpm run docs:dev
```

开发者创建模块后，可以编辑对应目录下的`README.md`，文档预览会实时同步

## 构建

```bash
pnpm run build
```

代码构建会生成`es`和`umd`两种风格的代码，`es`代码存放在`lib`目录中，`umd`代码存放在`dist`目录中。

## 提交代码

> 该代码仓库使用了[eslint](https://eslint.org)和[stylelint](https://stylelint.io/)对代码进行校验，同时也使用了[commitlint](https://github.com/conventional-changelog/commitlint)来确保提交信息符合[conventional commit format](https://www.conventionalcommits.org/en/v1.0.0/)，如果任何一个环节校验出错都会导致提交失败。

执行`git commit`时会自动进行`eslint`、`stylelint`校验，同时也会辅助生成规范化的提交信息，如下

![commit](./image/commit.png)

## 分支管理

- `dev_2.x`分支为开发分支，用户需要从`dev_2.x`拉出自己的开发分支，开发完成后提交到自己的开发分支并推送到`gitlab`仓库，然后发起合并到`dev_2.x`分支的`merge request`
- `2.x`分支为生产环境分支，当能够发布新版本时，维护者会将`dev_2.x`合并到`2.x`分支。借助 gitlab 的 ci/cd 和 webhook 功能，合并到`2.x`分支时可以实现自动打 tag、发布到 npm 以及更新文档网站的功能
