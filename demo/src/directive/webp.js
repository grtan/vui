// zhumingpeng
// 判断当前浏览器环境是否支持webp，如果支持自动切换webp图片，否则使用原来的图片
window.supportsWebP = (function () {
  var canvas = typeof document === 'object' ? document.createElement('canvas') : {}
  canvas.width = canvas.height = 1
  return canvas.toDataURL ? canvas.toDataURL('image/webp').indexOf('image/webp') === 5 : false
}())
const webp = {}
webp.install = (Vue, options = {}) => {
  Vue.directive('webp', {
    // 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。
    bind: function (el, binding) {
      if (binding.value && window.supportsWebP) {
        let webpSrc = binding.value + '.webp'
        el.style.backgroundImage = 'url("' + webpSrc + '")'
        let image = new Image()
        image.src = webpSrc
        image.onerror = function () {
          if (this.errorTag) {
            return
          }
          this.errorTag = true
          if ((process.env.NODE_ENV === 'production')) {
            console.warn('webp背景加载出错，退回原先格式，请检查该图片路径和尺寸，错误链接为：' + webpSrc)
          }
          el.style.backgroundImage = 'url("' + binding.value + '")'
        }
      } else if (el.tagName.toLowerCase() === 'img' && el.src && el.src.indexOf('data:image') === -1 && window.supportsWebP) {
        var _src = el.src
        el.src = _src + '.webp'
        el.onerror = function () {
          if (this.errorTag) {
            return
          }
          this.errorTag = true
          console.warn('webp加载出错，退回原先格式，请检查该图片路径和尺寸，错误链接为：' + el.src)
          el.src = _src
        }
      }
    }
  })
}
export default webp
