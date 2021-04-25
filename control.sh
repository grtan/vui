#!/bin/bash

# 不存在pnpm命令就全局安装pnpm
if [ ! `command -v pnpm` ]
then
  npm i -g pnpm
fi

# 文档、dist构建
pnpm i --frozen-lockfile --registry http://npm.vivo.com.cn/
pnpm run docs:build

# demo构建
cd demo
pnpm i --frozen-lockfile --registry http://npm.vivo.com.cn/
pnpm run build
