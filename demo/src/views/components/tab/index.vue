<template>
  <div>
    <p :class="$style.config" class="is-size-5 has-text-centered">配置</p>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">垂直方向</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <label class="checkbox"><input type="checkbox" name="vertical" v-model="vertical">{{vertical}}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">自动切换</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <label class="checkbox"><input type="checkbox" name="auto" v-model="auto">{{auto}}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">能否滚动item列表</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <label class="checkbox"><input type="checkbox" name="scroll" v-model="scroll">{{scroll}}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">显示线条</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <label class="checkbox"><input type="checkbox" name="showLine" v-model="showLine">{{showLine}}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">线条位置</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <label class="checkbox"><input type="checkbox" name="lineUpside"
                                           v-model="lineUpside">{{lineUpside ? '顶部或左侧' : '底部或右侧'}}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">线条长度</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control level is-mobile">
            <label class="radio level-item"><input type="radio" name="lineSize" value="0.3"
                                                   v-model.number="lineSize">0.3</label>
            <label class="radio level-item"><input type="radio" name="lineSize" value="0.6"
                                                   v-model.number="lineSize">0.6</label>
            <label class="radio level-item"><input type="radio" name="lineSize" value="1"
                                                   v-model.number="lineSize">1</label>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">线条过渡动画类型</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control level is-mobile">
            <label class="radio level-item"><input type="radio" name="lineAnimation" value="none"
                                                   v-model="lineAnimation">none</label>
            <label class="radio level-item"><input type="radio" name="lineAnimation" value="sync"
                                                   v-model="lineAnimation">sync</label>
            <label class="radio level-item"><input type="radio" name="lineAnimation" value="async"
                                                   v-model="lineAnimation">async</label>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">过渡时间</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control level is-mobile">
            <label class="radio level-item"><input type="radio" name="duration" value="300"
                                                   v-model.number="duration">300ms</label>
            <label class="radio level-item"><input type="radio" name="duration" value="3000"
                                                   v-model.number="duration">3000ms</label>
            <label class="radio level-item"><input type="radio" name="duration" value="6000"
                                                   v-model.number="duration">6000ms</label>
          </div>
        </div>
      </div>
    </div>
    <tab :class="[$style.tab,vertical&&$style.vertical]" v-model="index" :vertical="vertical" :auto="auto"
         :scroll="scroll" :show-line="showLine" :line-upside="lineUpside" :line-size="lineSize"
         :line-animation="lineAnimation" :duration="duration" ref="tab" @click="onClick">
      <tab-item :class="$style.item" v-for="item in list" :key="item">分类{{item}}</tab-item>
    </tab>
  </div>
</template>

<style module>
  .tab {
    margin: 1rem 0;
  }

  .item {
    width: 2rem;
    line-height: 1rem;
  }

  .vertical {
    margin: 1rem 0 1rem 4rem;
    height: 6rem;
  }

  .vertical .item {
    line-height: 1.2rem;
  }
</style>

<script>
  import { Tab, TabItem } from 'vui'

  export default {
    components: {
      Tab,
      TabItem
    },
    data () {
      return {
        list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        index: 2,
        vertical: false,
        auto: true,
        scroll: true,
        showLine: true,
        lineUpside: false,
        lineSize: 1,
        lineAnimation: 'async',
        duration: 300
      }
    },
    methods: {
      onClick(index) {
        if (!this.auto) {
          if (this.waiting) {
            return
          }

          this.waiting = true
          this.$vui.toast.show({
            slot: '正在加载...',
            time: 2000
          })
          setTimeout(() => {
            this.index = index
            this.waiting = false
          }, 2500)
        } else {
          this.$vui.toast.show({
            slot: `第${index + 1}个分类`,
            time: 2000,
            single: false
          })
        }
      }
    }
  }
</script>
