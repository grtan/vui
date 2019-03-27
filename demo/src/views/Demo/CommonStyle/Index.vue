<template>
  <div class='commonStyle' id='commonStyle'>
    <div class="ellipsis item" >demo1:class:ellipsis;单行文本，超出省略号，示例如下。</div>
    <div class="ellipsis-line item" >demo2:class:ellipsis-line; 多行文本超出省略号，默认两行，可以根据自己的需求样式覆盖。示例如下。xxxxxxx</div>
    <div class="unselect item">demo3:在class中添加"unselect"可以实现禁止用户选中的效果。</div>
    <ul class="clearfix bg1" >
      <li>demo4:class:clearfix</li>
      <li>在父级元素添加clearfix样式</li>
      <li>实现清除浮动</li>
      <li>具体打开开发者工具参看代码</li>
    </ul>
    <div style="margin-top:1rem">demo5:class:full;以父类的宽高充满;紫色就是父类 图片是子元素</div>
    <div style="width:8rem;margin: 0 auto " class="bg2">
      <img src="~@/assets/error.png" class="full">
    </div>
  </div>
</template>
<script>
export default {
  name: 'commonStyle'
}
</script>
<style lang="less">
.commonStyle {
  ul li {
    float: left;
    width: 3.5rem;
    height: 2rem;
    background: lightgreen;
    list-style-type: none;
    margin: 2px 5px 4px;
  }
  .item {
    margin: 1rem 0 1rem 0;
    padding: 0 0.5rem;
  }
  .bg1 {
    background-color: darkorange;
  }
  .bg2 {
    background-color: #ca6cdf;
  }
}
</style>
