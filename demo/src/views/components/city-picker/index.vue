<template>
  <div>
    <p :class="$style.config" class="is-size-5 has-text-centered">配置</p>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">过滤特殊地区</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <label class="checkbox"><input type="checkbox" name="filter" v-model="filter">{{filter}}</label>
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
    <p>当前选中的地区：{{indexs.join('-')}}</p>
    <div :class="$style.btns">
      <a class="button is-primary is-fullwidth is-rounded" @click="show=true">显示</a>
    </div>
    <city-picker :class="$style.picker" v-model="show" :enable3d="enable3d" @update="onUpdate"
                 @confirm="onUpdate"></city-picker>
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

  .picker :global(.vui-picker) {
    height: 7rem !important;
  }
</style>

<script>
  import { CityPicker } from 'vui'

  export default {
    components: {
      CityPicker
    },
    data () {
      return {
        show: false,
        filter: true,
        enable3d: true,
        indexs: []
      }
    },
    methods: {
      onUpdate(value) {
        this.indexs = value
      }
    }
  }
</script>
