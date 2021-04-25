#!/bin/bash

npm i -g pnpm

# 文档、dist构建
pnpm i --frozen-lockfile --registry http://npm.vivo.com.cn/
pnpm run docs:build

# demo构建
cd demo
pnpm i --frozen-lockfile --registry http://npm.vivo.com.cn/
pnpm run build
