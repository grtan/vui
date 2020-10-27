# 开发指南

推荐采用类似`npm`和`yarn`的包管理工具[pnpm](https://pnpm.js.org/en/)来进行依赖管理（当然也可以继续使用`npm`或`yarn`），需要执行`npm i -g pnpm`进行全局安装。`pnpm`有如下优点

1. 安装的依赖目录结构不像`npm`、`yarn`那样尽量扁平化，而是保持与依赖关系一致，这样可以确保模块无法访问没有显式声明的依赖
2. 同一个版本的依赖包在电脑上只会全局存在一份，其他地方全部采用软链接、硬链接的方式实现访问，大大节省了磁盘空间

参考
  * [为什么我们应该使用 pnpm](https://segmentfault.com/a/1190000013214927)
  * [node_modules 困境](https://zhuanlan.zhihu.com/p/137535779)

## 创建模块

```bash
pnpm create
```

![create](./image/create.png)

执行命令自动创建模块后，开发者只需要编写对应模块的代码、文档。代码采用`ts`进行编写，且禁止`export default xx`默认导出。由于`package.json`中声明了`sideEffects: false`，所以请务必保证开发的代码**不存在副作用**，详见[Tree Shaking](https://webpack.js.org/guides/tree-shaking/)

## 删除模块

```bash
pnpm delete
```

![delete](./image/delete.png)

## 预览文档

```bash
pnpm docs:dev
```

开发者创建模块后，可以编辑对应目录下的`README.md`，文档预览会实时同步

## 构建

```bash
pnpm build
```

代码构建会生成`es`和`umd`两种风格的代码，`es`代码存放在`lib`目录中，`umd`代码存放在`dist`目录中。

## 提交代码

> 该代码仓库使用了[eslint](https://eslint.org)对代码进行校验，同时也使用了[commitlint](https://github.com/conventional-changelog/commitlint)来确保提交信息符合[conventional commit format](https://www.conventionalcommits.org/en/v1.0.0/)，如果任何一个环节校验出错都会导致提交失败。

执行`git commit`时会自动进行`eslint`校验，同时也会辅助生成规范化的提交信息，如下

![commit](./image/commit.png)

## 分支管理

- `dev`分支为开发分支，用户需要从`dev`拉出自己的开发分支，开发完成后提交到自己的开发分支并推送到`gitlab`仓库，然后发起合并到`dev`分支的`merge request`
- `master`分支为生产环境分支，当能够发布新版本时，维护者会将`dev`合并到`master`分支。借助gitlab的ci/cd和webhook功能，合并到`master`分支时可以实现自动升版打tag、发布到npm以及更新文档网站的功能
