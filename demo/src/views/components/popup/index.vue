<template>
  <div>
    <p :class="$style.config" class="is-size-5 has-text-centered">配置</p>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">弹出方向</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control level is-mobile">
            <label class="radio level-item"><input type="radio" name="direction" value="up"
                                                   v-model="direction">向上</label>
            <label class="radio level-item"><input type="radio" name="direction" value="down"
                                                   v-model="direction">向下</label>
            <label class="radio level-item"><input type="radio" name="direction" value="left"
                                                   v-model="direction">向左</label>
            <label class="radio level-item"><input type="radio" name="direction" value="right"
                                                   v-model="direction">向右</label>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">是否有蒙层</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <label class="checkbox"><input type="checkbox" name="layer" v-model="layer">{{layer}}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">点击蒙层关闭</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <label class="checkbox"><input type="checkbox" name="clickClose" v-model="clickClose">{{clickClose}}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">返回关闭</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <label class="checkbox"><input type="checkbox" name="backClose" v-model="backClose">{{backClose}}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">阻止点击或back自动关闭</label>
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
      <a class="button is-primary is-fullwidth is-rounded" @click="show=true">显示</a>
    </div>
    <popup v-model="show" :direction="direction" :layer="layer" :click-close="clickClose"
           :back-close="backClose" :prevent-close="preventClose" @click="onclick" @back="onback">
      <div class="box">
        <p>
          巴厘岛，印度尼西亚岛屿，位于爪哇岛东部，面积5620平方公里，岛上热带植被茂密，是举世闻名的旅游岛。巴厘岛是印尼17000多个岛屿当中最耀眼的一个岛屿，位于爪哇岛东部，面积5620平方公里，岛上山脉纵横、风情万种、景物绮丽。岛上东西宽140公里，南北相距80公里，全岛总面积为5620㎞²</p>
        <a class="button is-fullwidth is-outlined is-primary" :class="$style.close" @click="show=false">关闭</a>
      </div>
    </popup>
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
  import { Popup } from 'vui'

  export default {
    components: {
      Popup
    },
    data () {
      return {
        show: false,
        direction: 'up',
        layer: true,
        clickClose: false,
        backClose: true,
        preventClose: false
      }
    },
    methods: {
      onclick(prevented) {
        if (this.clickClose && prevented) {
          this.$vui.toast.show({
            slot: '点击关闭已被阻止',
            position: 'bottom'
          })
        }
      },
      onback(prevented) {
        if (this.backClose && prevented) {
          this.$vui.toast.show({
            slot: 'back关闭已被阻止',
            position: 'bottom'
          })
        }
      }
    }
  }
</script>
