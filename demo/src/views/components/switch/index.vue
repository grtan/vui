<template>
  <div>
    <p :class="$style.config" class="is-size-5 has-text-centered">配置</p>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">类型</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control level is-mobile">
            <label class="radio level-item">
              <input type="radio" name="type" value="default" v-model="type" />default
            </label>
            <label class="radio level-item">
              <input type="radio" name="type" value="funtouch9" v-model="type" />funtouch9
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">边框颜色（只对default类型有效）</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control level is-mobile">
            <label class="radio level-item">
              <input class="input" type="color" name="border-color" v-model="borderColor" />
              {{borderColor}}
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">圆圈颜色</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control level is-mobile">
            <label class="radio level-item">
              <input class="input" type="color" name="circle-color" v-model="circleColor" />
              {{circleColor}}
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">关闭状态的背景色</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control level is-mobile">
            <label class="radio level-item">
              <input class="input" type="color" name="off-color" v-model="offColor" />
              {{offColor}}
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">开启状态时的背景色</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control level is-mobile">
            <label class="radio level-item">
              <input class="input" type="color" name="on-color" v-model="onColor" />
              {{onColor}}
            </label>
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
            <label class="radio level-item">
              <input type="radio" name="duration" value="300" v-model.number="duration" />300ms
            </label>
            <label class="radio level-item">
              <input type="radio" name="duration" value="1000" v-model.number="duration" />1000ms
            </label>
            <label class="radio level-item">
              <input type="radio" name="duration" value="3000" v-model.number="duration" />3000ms
            </label>
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
            <label class="checkbox">
              <input type="checkbox" name="disabled" v-model="disabled" />
              {{disabled}}
            </label>
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
            <label class="checkbox">
              <input type="checkbox" name="prevent" v-model="prevent" />
              {{prevent}}
            </label>
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.switch">
      <vui-switch
        v-model="checked"
        :type="type"
        :border-color="borderColor"
        :circleColor="circleColor"
        :background-colors="[offColor,onColor]"
        :duration="duration"
        :disabled="disabled"
        :prevent="prevent"
        @change="change"
        @click="click"
      ></vui-switch>
    </div>
  </div>
</template>

<style module>
.config {
  padding-bottom: 0.4rem;
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
  data() {
    return {
      checked: false,
      type: 'default',
      borderColor: '#dfdfdf',
      circleColor: '#ffffff',
      offColor: '#f0f0f0',
      onColor: '#456fff',
      duration: 300,
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
