<template>
  <div>
    <toast ref="toast1" :time="time" :position="position" :single="single" :className="className">纯文本toast</toast>
    <toast ref="toast2" :time="time" :position="position" :single="single" :className="$style.pic">
      <img src="./error.png">
      <span>对不起，操作失败</span>
    </toast>
    <p :class="$style.config" class="is-size-5 has-text-centered">配置</p>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">显示时间</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control level is-mobile">
            <label class="radio level-item"><input type="radio" name="time" value="500"
                                                   v-model.number="time">500ms</label>
            <label class="radio level-item"><input type="radio" name="time" value="3000"
                                                   v-model.number="time">3000ms</label>
            <label class="radio level-item"><input type="radio" name="time" value="6000"
                                                   v-model.number="time">6000ms</label>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">位置</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control level is-mobile">
            <label class="radio level-item"><input type="radio" name="position" value="top"
                                                   v-model="position">top</label>
            <label class="radio level-item"><input type="radio" name="position" value="center"
                                                   v-model="position">center</label>
            <label class="radio level-item"><input type="radio" name="position" value="bottom"
                                                   v-model="position">bottom</label>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">同时只显示一个toast</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <label class="checkbox"><input type="checkbox" name="single" v-model="single">{{single}}</label>
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.btns">
      <a class="button is-primary is-fullwidth" @click="show1">纯文本toast</a>
      <a class="button is-primary is-fullwidth" @click="show2">带图片toast</a>
      <a class="button is-primary is-fullwidth" @click="showPlugin">以插件形式显示</a>
      <a class="button is-primary is-fullwidth" @click="close">关闭所有toast</a>
    </div>
  </div>
</template>

<style module>
  .pic img, .pic span {
    display: inline-block;
    vertical-align: middle;
  }

  .pic img {
    margin-right: .15rem;
    width: .5rem;
  }

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
</style>

<script>
  import { Toast } from 'vui'

  export default {
    components: {
      Toast
    },
    data () {
      return {
        time: 3000,
        position: 'bottom',
        single: true,
        className: 'my-toast'
      }
    },
    methods: {
      show1() {
        this.$refs.toast1.show()
      },
      show2() {
        this.$refs.toast2.show()
      },
      showPlugin () {
        this.$vui.toast.show({
          slot: '这是toast插件',
          time: this.time,
          single: this.single,
          position: this.position
        })
      },
      close () {
        this.$vui.toast.hide()
      }
    }
  }
</script>
