<template>
  <div :class="$style.root">
    <vui-dialog v-model="show" title="蓝冰洞">
      冰岛的自然奇观不少，首屈一指、世间最无可取代的就是蓝冰洞。它们纯天然形成，夏季时冰川融水流过冰川底部，日积月累雕琢出形状不定的冰洞。冰川都是千年历史的自然构造，冰块中的空气、杂质通通被压出冰体。冰体内无杂质时，光线穿过时不会被肆意折射，冰体就会更加透明，呈现出梦幻的蓝色。
      <template slot="footer">
        <vui-button hue="primary" corner="round" @click="show = !show">取消</vui-button>
        <vui-button type="gorgeous" hue="primary" corner="round" @click="show = !show">确定</vui-button>
      </template>
    </vui-dialog>
    <vui-button type="gorgeous" hue="primary" @click="show = !show">{{ show ? '隐藏' : '显示' }}</vui-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VuiDialog from '../component.vue'
import VuiButton from '../../button/component.vue'

@Component({
  components: {
    VuiDialog,
    VuiButton
  }
})
export default class VComponent extends Vue {
  static title = '组件形式'
  show = false
}
</script>

<style lang="scss" module>
.root {
  align-items: center;
  display: flex;
  flex-direction: column;
}
</style>
