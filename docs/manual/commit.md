# commit规范

> 组件库使用[commitizen](https://github.com/commitizen/cz-cli)来规范提交信息，这样可以使用[conventional-changelog](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli)自动生成`CHANGELOG.md`

`package.json`中已经配置了相关的命令

```
{
  "scripts": {
    "commit": "git-cz",
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s"
  }
}
```

#### 提交代码

1. `git add`添加修改的文件
2. `npm run commit`提交代码（**不能直接使用`git commit`**），期间会出现各种提交类型供选择，请选择合适的类型并填写相关的信息
3. `npm run changelog`更新`CHANGELOG.md`，再执行一遍流程1和2