<template>
  <div class='gap' id='gap'>
    F12观察network请求
    <div class="item" v-stat="{'act':'show',params:{origin:16}}">
      1.页面展示
    </div>
    <div class="item" v-stat="{'act':'click',params:{origin:17}}">
      2.点击我开始埋点
    </div>
    <div class="item item1" v-stat="[{'act':'show',params:{origin:18}},{'act':'click',params:{origin:19}}]">
      3.页面展示或点击都会发生埋点
    </div>
    <div class="item item2" v-stat="{'act':'mouseover',params:{origin:20}}">
      4.鼠标悬浮(pc)会发生埋点(自定义触发行为)
    </div>
  </div>
</template>
<style lang="less">
#gap {
  .item {
    height: 1.5rem;
    line-height: 1.5rem;
    color: #666;
    padding: 0 0.5rem;
  }
  .item1 {
    &:active {
      color: red;
    }
  }
  .item2 {
    &:hover {
      color: aquamarine;
    }
  }
}
</style>