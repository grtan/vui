#!/bin/bash

register() {
  # 创建runner共享的数据卷
  docker volume create utils_gitlab-runner
  # 生成runner共享的配置文件
  docker run --rm -v utils_gitlab-runner:/etc/gitlab-runner gitlab/gitlab-runner:alpine register \
    --non-interactive \
    --executor "docker" \
    --docker-image alpine:latest \
    --url "https://gitlab.vmic.xyz/" \
    --registration-token "U_-duTMHzfKw9dL5qKiJ" \
    --description "game-common组公用的runner" \
    --run-untagged="true" \
    --locked="false"
}

start() {
  echo "启动gitlab runner，实例数目为$1"
  docker-compose up -d --scale gitlab-runner=$1
}

if [ "$1" = "start" ] 
then
  # 未指定容器实例数时，默认为1，2表示$2，为脚本第二个参数
  start ${2:-1}
else
  register
fi
