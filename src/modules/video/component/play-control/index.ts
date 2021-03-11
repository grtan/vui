import videojs from 'video.js'
import VComponent from './component.vue'

export default class PlayControl extends videojs.getComponent('Component') {
  private vm!: VComponent

  constructor(...args: ConstructorParameters<ReturnType<typeof videojs['getComponent']>>) {
    super(...args)
    this.vm.$emit('inited', ...args)
  }

  createEl() {
    this.vm = new VComponent({
      // 必须要传入el，或者手动调用$mount()挂载后，才会渲染模板，否则$el为undefined
      el: document.createElement('div')
    })

    return this.vm.$el
  }
}
