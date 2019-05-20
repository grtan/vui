<template>
  <div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label" :class="$style.label">单个元素</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <label class="checkbox"><input type="checkbox" name="show" v-model="show">{{show}}</label>
          </div>
        </div>
      </div>
      <cutover :class="$style.box">
        <div :class="$style.element" v-show="show">元素</div>
      </cutover>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label" :class="$style.label">两个元素</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control level is-mobile">
            <label class="radio level-item"><input type="radio" name="type1" value="el1" v-model="type1">元素1</label>
            <label class="radio level-item"><input type="radio" name="type1" value="el2" v-model="type1">元素2</label>
          </div>
        </div>
      </div>
      <cutover :class="$style.box" mode="out-in">
        <div :class="$style.element" v-if="type1==='el1'" key="1">元素1</div>
        <div :class="$style.element" v-else key="2">元素2</div>
      </cutover>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label" :class="$style.label">三个元素</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control level is-mobile">
            <label class="radio level-item"><input type="radio" name="type2" value="el1" v-model="type2">元素1</label>
            <label class="radio level-item"><input type="radio" name="type2" value="el2" v-model="type2">元素2</label>
            <label class="radio level-item"><input type="radio" name="type2" value="el3" v-model="type2">元素3</label>
          </div>
        </div>
      </div>
      <cutover :class="$style.box" type="popup-up">
        <div :class="$style.element" v-if="type2==='el1'" key="1">元素1</div>
        <div :class="$style.element" v-else-if="type2==='el2'" key="2">元素2</div>
        <div :class="$style.element" v-else key="3">元素3</div>
      </cutover>
    </div>
  </div>
</template>

<style module>
  .label {
    margin-top: 50px;
  }

  .box {
    margin-top: 30px;
    height: 300px;
    border: 1px solid #ccc;
  }

  .element {
    line-height: 300px;
    text-align: center;
  }
</style>

<script>
  import { Cutover } from 'vui'

  export default {
    components: {
      Cutover
    },
    data () {
      return {
        show: true,
        type1: 'el1',
        type2: 'el1'
      }
    }
  }
</script>
