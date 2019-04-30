<template>
  <div>
    <p :class="$style.config" class="is-size-5 has-text-centered">配置</p>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">过渡时间</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control level is-mobile">
            <label class="radio level-item"><input type="radio" name="duration" value="500"
                                                   v-model.number="duration">500ms</label>
            <label class="radio level-item"><input type="radio" name="duration" value="3000"
                                                   v-model.number="duration">3000ms</label>
            <label class="radio level-item"><input type="radio" name="duration" value="6000"
                                                   v-model.number="duration">6000ms</label>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">是否是全局的</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <label class="checkbox"><input type="checkbox" name="global" v-model="global">{{global}}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">背景色</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <label class="background"><input type="color" name="background" v-model="background">{{background}}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">点击蒙层是否关闭</label>
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
        <label class="label">返回时关闭</label>
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
      <a class="button is-primary is-fullwidth is-rounded" @click="show=true">显示蒙层</a>
    </div>
    <layer v-model="show" :duration="duration" :background="background" :global="global" :click-close="clickClose"
           :back-close="backClose" :prevent-close="preventClose" @click="onclick" @back="onback">
      <div :class="$style.box" class="box">
        <p>
          巴厘岛，印度尼西亚岛屿，位于爪哇岛东部，面积5620平方公里，岛上热带植被茂密，是举世闻名的旅游岛。巴厘岛是印尼17000多个岛屿当中最耀眼的一个岛屿，位于爪哇岛东部，面积5620平方公里，岛上山脉纵横、风情万种、景物绮丽。岛上东西宽140公里，南北相距80公里，全岛总面积为5620㎞²</p>
        <a class="button is-fullwidth is-outlined is-primary" :class="$style.close" @click="show=false">关闭</a>
      </div>
    </layer>
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

  .box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
  }

  .close {
    margin-top: .5rem;
  }
</style>

<script>
  import { Layer } from 'vui'

  export default {
    components: {
      Layer
    },
    data () {
      return {
        show: false,
        duration: 500,
        background: '#000b',
        global: true,
        clickClose: true,
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

//          this.$vui.dialog.show({
//            title: '标题',    //标题，没有则不显示
//            slot: '<em>正文内容</em>',   //正文内容
//            callback(type, close) {     //点击按钮的回调
//              //type跟组件形式一样
//              close();    //关闭
//            }
//          });
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
