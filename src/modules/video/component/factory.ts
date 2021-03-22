import videojs from 'video.js'
import Vue from 'vue'

export default function (VComponent: typeof Vue) {
  return class extends videojs.getComponent('Component') {
    createEl() {
      return new VComponent({
        // 必须要传入el，或者手动调用$mount()挂载后，才会渲染模板，否则$el为undefined
        el: document.createElement('div'),
        player: this.player()
      }).$el
    }
  }
}
