<template>
  <div class='changeBgColor' id='changeBgColor'>
    <br>离开本页面后，样式恢复
    <pre>
      使用  '@/mixins/elementClass'
      {
        mixins: [elementClassMixin],
        elementClass:{
          el:el,:String,
          className:控制el的样式class,:String
        }
      }
      .bg-white {
        background: #3a4d75;
        color: #1cc785;
      }
      </pre>
  </div>
</template>
<script>
import elementClassMixin from '@/mixins/elementClass'
export default {
  name: 'changeBgColor',
  mixins: [elementClassMixin],
  elementClass: {
    el: 'html',
    className: 'bg-white'
  }
}
</script>
<style lang="less">
.bg-white {
  background: #3a4d75;
  color: #1cc785;
}
</style>
