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
        <label class="label">显示取消按钮</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <label class="checkbox"><input type="checkbox" name="showCancel" v-model="showCancel">{{showCancel}}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">显示确定按钮</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <label class="checkbox"><input type="checkbox" name="showConfirm"
                                           v-model="showConfirm">{{showConfirm}}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">3d旋转样式</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <label class="checkbox"><input type="checkbox" name="enable3d" v-model="enable3d">{{enable3d}}</label>
          </div>
        </div>
      </div>
    </div>
    <p>当前选中的列index：{{indexs.join('-')}}</p>
    <div :class="$style.btns">
      <a class="button is-primary is-fullwidth is-rounded" @click="show=true">显示</a>
    </div>
    <popup-picker v-model="show" :data="data" :enable3d="enable3d" :title="title"
                  :cancel="cancel" :confirm="confirm" @confirm="onConfirm"></popup-picker>
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
    z-index: 9;
    left: .3rem;
    right: .3rem;
    bottom: .3rem;
  }

  .btns :global(.button) {
    margin-top: .15rem;
  }
</style>

<script>
import { PopupPicker } from 'vui'

export default {
  components: {
    PopupPicker
  },
  data () {
    return {
      show: false,
      showTitle: true,
      showCancel: true,
      showConfirm: true,
      enable3d: true,
      indexs: [],
      data: (function () {
        var num = 3

        function deep () {
          var index = arguments[0] || 0,
            data = {
              //                name: '列' + (index + 1),
              options: []
            }

          for (var i = 0; i < 80; i++) {
            data.options.push((index < num - 1) && (!i || Math.random() > 0.5) ? {
              value: index + '-' + (arguments[1] || 0) + '-' + i,
              children: deep(index + 1, i)
            } : index + '-' + (arguments[1] || 0) + '-' + i)
          }

          return data
        }

        return deep()
      }())
    }
  },
  computed: {
    title () {
      return this.showTitle ? '标题' : ''
    },
    cancel () {
      return this.showCancel ? '取消' : ''
    },
    confirm () {
      return this.showConfirm ? '确定' : ''
    }
  },
  methods: {
    onConfirm (value) {
      this.indexs = value
    }
  }
}
</script>
