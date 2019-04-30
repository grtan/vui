<template>
  <div>
    <p :class="$style.config" class="is-size-5 has-text-centered">配置</p>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">显示标题</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <label class="checkbox"><input type="checkbox" name="showTitle" v-model="showTitle">{{showTitle}}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">点击关闭按钮或者back时是否阻止关闭</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <label class="checkbox"><input type="checkbox" name="preventClose"
                                           v-model="preventClose">{{preventClose}}</label>
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.btns">
      <a class="button is-primary is-fullwidth is-rounded" @click="show=true">以组件形式显示</a>
      <a class="button is-primary is-fullwidth is-rounded" @click="showPlugin">以插件形式显示</a>
    </div>
    <vui-dialog v-model="show" :duration="280" :prevent-close="preventClose" :title="title"
                @btn-click="onBtnClick">
      巴厘岛，印度尼西亚岛屿，位于爪哇岛东部，面积5620平方公里，岛上热带植被茂密，是举世闻名的旅游岛。
    </vui-dialog>
  </div>
</template>

<style module>
  .config {
    padding-bottom: .4rem;
  }

  .item {
    padding: .2rem .5rem;
  }

  .btns {
    position: fixed;
    left: .3rem;
    right: .3rem;
    bottom: .3rem;
  }

  .btns :global(.button) {
    margin-top: .15rem;
  }

  .close {
    margin-top: .5rem;
  }
</style>

<script>
  import { Dialog } from 'vui'

  export default {
    components: {
      VuiDialog: Dialog
    },
    data () {
      return {
        show: false,
        preventClose: false,
        showTitle: true
      }
    },
    computed: {
      title () {
        return this.showTitle ? '巴厘岛' : ''
      }
    },
    methods: {
      onBtnClick (type) {
        if (type > -1) {
          this.show = false
          this.$vui.toast.show({
            slot: `点击了第${type + 1}个按钮`,
            position: 'bottom'
          })
        } else if (this.preventClose) {
          this.$vui.toast.show({
            slot: '阻止关闭',
            position: 'bottom'
          })
        }
      },
      showPlugin () {
        this.$vui.dialog.show({
          preventClose: this.preventClose,
          title: this.showTitle ? '长滩岛' : '',
          slot: '长滩岛（Boracay）是菲律宾中部的一座岛屿，属于西米沙鄢群岛，位于班乃岛西北2公里，是菲律宾的旅游胜地之一。',
          callback: (type, close) => {
            if (type > -1) {
              close()
              this.$vui.toast.show({
                slot: `点击了第${type + 1}个按钮`,
                position: 'bottom'
              })
            } else if (this.preventClose) {
              this.$vui.toast.show({
                slot: '阻止关闭',
                position: 'bottom'
              })
            }
          }
        })
      }
    }
  }
</script>
