<template>
  <div class='backFn' id='backFn'>
    <div @click="showPopup">点击显示popup</div>
    <hr>
    <div>
      触发返回事件的指令使用如下：
      <pre>
      使用 v-backFn指令
      {
        show:控制显示隐藏的data属性,:Object,
        closeFn:关闭方法字符串,:String
      }
      </pre>
    </div>
    <popup v-model="popupState" position="top" v-backFn="{'show':popupState,'closeFn':'hidePopup'}">
      <span>
        此时触发浏览器后退，弹框将会被关闭。
      </span>
      <span @click="showDialog" style="color:red">当然你可以点击我，再打出一个弹框。</span>
    </popup>
    <x-dialog v-model="dialogState" v-backFn="{'show':dialogState,'closeFn':'hideDialog'}">
      <div>
        <div @click="hideDialog" style="color:red">点击我关闭当前弹框</div>
        <div>或试试返回键 😄</div>
      </div>
    </x-dialog>
  </div>
</template>
<script>
import { Popup, XDialog } from '@vivo/vivo-ui'
export default {
  name: 'backFn',
  components: { Popup, XDialog },
  data () {
    return {
      popupState: false,
      dialogState: false
    }
  },
  methods: {
    showPopup () {
      this.popupState = true
    },
    hidePopup () {
      this.popupState = false
    },
    showDialog () {
      this.dialogState = true
    },
    hideDialog () {
      this.dialogState = false
    }
  }
}
</script>
<style lang="less">
</style>
