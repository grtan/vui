<template>
  <div>
    <p :class="$style.config" class="is-size-5 has-text-centered">配置</p>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">未选中时的颜色</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control level is-mobile">
            <label class="radio level-item"><input class="input" type="color" name="color1" v-model="color1">{{color1}}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">选中时的颜色</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control level is-mobile">
            <label class="radio level-item"><input class="input" type="color" name="color2" v-model="color2">{{color2}}</label>
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
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">阻止默认切换</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <label class="checkbox"><input type="checkbox" name="prevent" v-model="prevent">{{prevent}}</label>
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.switch">
      <vui-switch v-model="checked" :color="[color1,color2]" :disabled="disabled" :prevent="prevent"
                  @change="change" @click="click"></vui-switch>
    </div>
  </div>
</template>

<style module>
  .config {
    padding-bottom: .4rem;
  }

  .switch {
    margin-top: 1rem;
  }

  .prompt {
    text-align: center;
  }
</style>

<script>
  import { Switch } from 'vui'

  export default {
    components: {
      VuiSwitch: Switch
    },
    data () {
      return {
        checked: false,
        color1: '#fff',
        color2: '#456FFF',
        disabled: false,
        prevent: false
      }
    },
    methods: {
      click(checked) {
        this.prevent && this.$vui.dialog.show({
          slot: `<div class="${this.$style.prompt}">确定点击开关？</div>`,
          callback: (type, close) => {
            close()

            if (type === 1) {
              this.checked = !checked
            }
          }
        })
      },
      change(checked) {
        this.$vui.toast.show({
          slot: checked ? '选中' : '未选中',
          position: 'bottom',
          single: false
        })
      }
    }
  }
</script>
