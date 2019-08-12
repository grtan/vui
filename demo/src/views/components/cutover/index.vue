<template>
  <div>
    <p>
      fade效果——
      <a class="button is-small" @click="show1=!show1">{{show1?'隐藏':'显示'}}</a>
    </p>
    <cutover :class="$style.box">
      <div :class="$style.element" v-show="show1">元素</div>
    </cutover>
    <p>
      cover效果——
      <a class="button is-small" @click="show2=!show2">{{show2?'隐藏':'显示'}}</a>
    </p>
    <cutover :class="$style.box" type="cover">
      <div :class="$style.element" v-show="show2">元素</div>
    </cutover>
    <p>
      popup-up效果——
      <a class="button is-small" @click="show3=!show3">{{show3?'隐藏':'显示'}}</a>
    </p>
    <cutover :class="$style.box" type="popup-up">
      <div :class="$style.element" v-show="show3">元素</div>
    </cutover>
    <p>
      slide-hz效果——
      <a class="button is-small" @click="show4=!show4">{{show4?'隐藏':'显示'}}</a>
    </p>
    <cutover :class="$style.box" type="slide-hz">
      <div :class="[$style.element,$style.slide]" v-show="show4">元素</div>
    </cutover>
    <p>
      slide-vt效果——
      <a class="button is-small" @click="show5=!show5">{{show5?'隐藏':'显示'}}</a>
    </p>
    <cutover :class="$style.box" type="slide-vt">
      <div :class="[$style.element,$style.slide]" v-show="show5">元素</div>
    </cutover>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label" :class="$style.label">两个元素</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control level is-mobile">
            <label class="radio level-item">
              <input type="radio" name="type1" value="el1" v-model="type1" />元素1
            </label>
            <label class="radio level-item">
              <input type="radio" name="type1" value="el2" v-model="type1" />元素2
            </label>
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
            <label class="radio level-item">
              <input type="radio" name="type2" value="el1" v-model="type2" />元素1
            </label>
            <label class="radio level-item">
              <input type="radio" name="type2" value="el2" v-model="type2" />元素2
            </label>
            <label class="radio level-item">
              <input type="radio" name="type2" value="el3" v-model="type2" />元素3
            </label>
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
  margin: 30px 0;
  height: 200px;
  border: 1px solid #ccc;
}

.element {
  line-height: 200px;
  text-align: center;
}

.slide {
  background: lightsalmon;
}
</style>

<script>
import { Cutover } from 'vui'

export default {
  components: {
    Cutover
  },
  data() {
    return {
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      type1: 'el1',
      type2: 'el1'
    }
  }
}
</script>
