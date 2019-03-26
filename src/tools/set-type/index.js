let resize

const html = document.documentElement
const attr = 'vui-pc'

export default function (type, boundary) { // 设置组件类型
  boundary = boundary || 768

  resize && window.removeEventListener('resize', resize) // 移除之前设置的监听器

  switch (type) {
    case 'responsive':
      if (window.innerWidth < boundary) {
        html.removeAttribute(attr)
      } else {
        html.setAttribute(attr, '')
      }

      window.addEventListener('resize', resize = function () {
        if (window.innerWidth < boundary) {
          html.removeAttribute(attr)
        } else {
          html.setAttribute(attr, '')
        }
      })
      break
    case 'pc':
      html.setAttribute(attr, '')
      break
    default:
      html.removeAttribute(attr)
  }
}
