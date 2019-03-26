import '../../assets/js/modernizr/modernizr'

export const prefixed = window.Modernizr.prefixed
export const afInterval = 16.67 // 动画帧时间间隔
export const raf = prefixed('requestAnimationFrame', window) || function (callback) {
    return setTimeout(callback, afInterval)
  }
export const caf = prefixed('cancelAnimationFrame', window) || function (id) {
    clearTimeout(id)
  }
