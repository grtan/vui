<template>
  <div>
    <vui-dialog :show-close="true" :before-close="beforeClose" v-model="show">
      <div>内容</div>
      <span slot="footer">asdgas</span>
    </vui-dialog>
    <button @click="show = !show">对话框开关</button>
    <button class="top" @click="showDialogPlugin()">对话框插件</button>
  </div>
</template>

<style lang="scss" src="../style/index.scss"></style>

<style lang="scss">
.top {
  position: fixed;
  z-index: 9999;
}
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Dialog from '../index'

@Component({
  components: {
    VuiDialog: Dialog
  }
})
export default class VComponent extends Vue {
  show = false
  order=0

  beforeClose(close:Function) {
    close()
  }
  
  showDialogPlugin() {
    this.order++
    Dialog.dialog({
      title: 'asdgsadg',
      allowHtml: true,
      showClose: true,
      headerAlign: 'left',
      content: `阿斯顿噶撒大<em>${this.order}撒大噶</em>噶说的阿斯顿噶撒大<em>${this.order}撒大噶</em>噶说的`,
      beforeClose(action,close) {
        console.log(action)
        close()
      }
    })
  }

  created() {
    // setTimeout(this.showDialogPlugin.bind(this,2),3000)
    // setTimeout(this.showDialogPlugin.bind(this,3),6000)
    // setTimeout(this.showDialogPlugin.bind(this,4),9000)
  }
}
</script>
