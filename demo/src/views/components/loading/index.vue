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
                <label class="label">是否有遮罩层</label>
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
                <label class="label">遮罩层是否是全局的</label>
            </div>
            <div class="field-body">
                <div class="field is-narrow">
                    <div class="control">
                        <label class="checkbox"><input type="checkbox" name="global" v-model="global">{{global}}</label>
                    </div>
                </div>
            </div>
        </div>
        <div :class="$style.content">
            <span :class="$style.child" v-for="(value,idx) in list" :key="idx">{{value}}</span>
            <loading :show="show" :duration="duration" :background="background" :layer="layer"
                     :global="global"></loading>
        </div>
        <div :class="$style.btns">
            <a class="button is-primary is-fullwidth is-rounded" @click="show=true">加载数据</a>
            <a class="button is-primary is-fullwidth is-rounded" @click="load">加载完成</a>
        </div>
    </div>
</template>

<style module>
    .config {
        padding-bottom: .8rem;
    }

    .item {
        padding: .4rem 1rem;
    }

    .content {
        height: 8rem;
        overflow: auto;
        word-break: break-all;
        border: 1px solid;
    }

    .child {
        margin-right: .5rem;
    }

    .btns {
        position: fixed;
        z-index: 9999;
        left: .6rem;
        right: .6rem;
        bottom: .6rem;
    }

    .btns :global(.button) {
        margin-top: .3rem;
    }
</style>

<script>
  import { Loading } from 'vui'

  export default {
    components: {
      Loading
    },
    data () {
      return {
        show: false,
        duration: 500,
        background: '#000b',
        layer: true,
        global: false,
        list: [0, 1, 2]
      }
    },
    methods: {
      load() {
        if (this.show) {
          const len = this.list.length

          this.list.push(len, len + 1, len + 2)
          this.show = false
        }
      }
    }
  }
</script>
