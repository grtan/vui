<template>
  <div :class="$style.root">
    <vui-button type="gorgeous" hue="primary" @click="onShow">显示</vui-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VuiDialog from '../index'
import VuiButton from '../../button/component.vue'

@Component({
  components: {
    VuiButton
  }
})
export default class VComponent extends Vue {
  static title = 'dialog方法'

  onShow() {
    VuiDialog.dialog({
      title: '寻猎北极光',
      content:
        '观赏北极光在夜空中舞动的美景，是许多人的毕生夙愿。许多人冬季来到北欧，就是为了能一睹北极光的真容。其实斯堪的纳维亚半岛的瑞典、挪威还有紧邻半岛的芬兰都能够看到极光。但这些国家都是只有一部分国土在极光带中，而冰岛全岛都在极光观测带内，可谓是北半球观测极光的最佳地点。',
      beforeClose(action, close) {
        VuiDialog.confirm({
          title: '是否关闭对话框',
          content: '',
          pushState: false,
          beforeClose(action, callback) {
            callback()
            close(action === 'confirm')
          }
        })
      }
    })
  }
}
</script>

<style lang="scss" module>
.root {
  align-items: center;
  display: flex;
  flex-direction: column;
}
</style>
