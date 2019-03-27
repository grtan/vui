import Utils from '@/utils'
export default {
  mounted () {
    let elementClass = this.$options.elementClass
    if (elementClass === undefined) {
      console.error('elementClassMixin需要指定elementClass属性')
      return
    }
    Utils.className.add(document.querySelector(elementClass.el), elementClass.className)
  },
  beforeDestroy () {
    Utils.className.remove(document.querySelector(this.$options.elementClass.el), this.$options.elementClass.className)
  }
}