<template>
  <div>
    <p :class="$style.config" class="is-size-5 has-text-centered">配置</p>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">颜色</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control level is-mobile">
            <input class="input" type="color" name="color" v-model="color">
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">尺寸</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control level is-mobile">
            <label class="radio level-item"><input type="radio" name="size" value="40"
                                                   v-model.number="size">&nbsp;小</label>
            <label class="radio level-item"><input type="radio" name="size" value="65"
                                                   v-model.number="size">&nbsp;中</label>
            <label class="radio level-item"><input type="radio" name="size" value="90"
                                                   v-model.number="size">&nbsp;大</label>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">禁用</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <label class="checkbox"><input type="checkbox" name="disabled" v-model="disabled">{{disabled}}</label>
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.icons">
      <div :class="$style.wrapper" :style="{color}" v-for="type in types">
        <icon :class="$style.icon" :style="{fontSize:`${size/100}rem`}" :type="type" :disabled="disabled"
              @click="onClick(type)"></icon>
        <div :class="$style.type">{{type}}</div>
      </div>
    </div>
  </div>
</template>

<style module>
  .config {
    padding-bottom: .4rem;
  }

  .icons {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
  }

  .wrapper {
    box-sizing: border-box;
    margin-top: .5rem;
    padding: .2rem;
    width: 20%;
    font-size: .3rem;
    text-align: center;
  }

  .icon {
    width: 1rem !important;
    line-height: 1rem !important;
  }

  .type {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>

<script>
  import { Icon } from 'vui'

  export default {
    components: {
      Icon
    },
    data () {
      return {
        types: ['low', 'silent', 'unlock', 'sound', 'share', 'setting', 'search', 'phone', 'scan', 'refresh', 'read', 'more', 'message', 'minimization', 'like', 'maximize', 'lock', 'loading', 'download', 'history', 'good', 'delete', 'delete-circle', 'back', 'commentaries'],
        color: '#000',
        size: 65,
        disabled: false
      }
    },
    methods: {
      onClick(type) {
        this.$vui.toast.show({
          slot: `点击图标${type}`,
          position: 'bottom',
          single: false
        })
      }
    }
  }
</script>
