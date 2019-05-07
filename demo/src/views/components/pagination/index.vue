<template>
  <div>
    <p :class="$style.prompt">该组件为pc端组件</p>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">总页数</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control level is-mobile">
            <label class="radio level-item"><input type="radio" name="total" value="5"
                                                   v-model.number="total">5</label>
            <label class="radio level-item"><input type="radio" name="total" value="10"
                                                   v-model.number="total">10</label>
            <label class="radio level-item"><input type="radio" name="total" value="20"
                                                   v-model.number="total">20</label>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">显示页数</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control level is-mobile">
            <label class="radio level-item"><input type="radio" name="size" value="5"
                                                   v-model.number="size">5</label>
            <label class="radio level-item"><input type="radio" name="size" value="7"
                                                   v-model.number="size">7</label>
            <label class="radio level-item"><input type="radio" name="size" value="9"
                                                   v-model.number="size">9</label>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">显示直接跳转区域</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <label class="checkbox"><input type="checkbox" name="showGoto" v-model="showGoto">{{showGoto}}</label>
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.btn">
      <pagination v-model="current" :total="total" :size="size" :showGoto="showGoto"></pagination>
    </div>
  </div>
</template>

<style module>
  .prompt {
    padding: .2rem 0 .5rem;
    font-weight: bold;
  }

  .btn {
    margin-top: 1rem;
  }
</style>

<script>
  import { Pagination } from 'vui'

  export default {
    components: {
      Pagination
    },
    data () {
      return {
        current: 1,
        total: 10,
        size: 7,
        showGoto: true
      }
    },
    watch: {
      current() {
        this.$vui.toast.show({
          slot: `当前第${this.current}页`,
          position: 'bottom',
          single: false
        })
      }
    }
  }
</script>
