<template>
  <div>
    <p :class="$style.config" class="is-size-5 has-text-centered">配置</p>
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
        <label class="label">全局loading</label>
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
      <loading :show="show" :layer="layer" :global="global"></loading>
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
