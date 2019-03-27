import store from '../store/'

function getOffsetTop (e) {
  var offsetTop = e.offsetTop
  if (e.offsetParent != null) offsetTop += getOffsetTop(e.offsetParent)
  return offsetTop
}
// 动画定位到目标元素
function scrollTo (element, to, duration, callback) {
  var start = element.scrollTop || element.pageYOffset || element.scrollY
  var change = to - start
  var currentTime = 0
  var increment = 20

  var easeInOutQuad = function (t, b, c, d) {
    t /= d / 2
    if (t < 1) return c / 2 * t * t + b
    t--
    return -c / 2 * (t * (t - 2) - 1) + b
  }
  var animateScroll = function () {
    currentTime += increment
    var val = easeInOutQuad(currentTime, start, change, duration)
    if (element === window) {
      window.scroll(0, val)
    } else {
      element.scrollTop = val
    }
    if (currentTime < duration) {
      setTimeout(animateScroll, increment)
    } else {
      callback && callback()
    }
  }
  animateScroll()
}

// 获取参数中指定name的值
function getQueryString (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var paramStr = window.location.search ? window.location.search.substr(1) : ''
  paramStr += '&' + (window.location.hash.split('?')[1] || '')
  var r = paramStr.match(reg)
  if (r != null) {
    return decodeURIComponent(r[2])
  }
  return null
}

function URLDecode (sStr) {
  // eslint-disable-next-line
  return unescape(sStr).replace(/\%2B/g, '+').replace(/\%22/g, '"').replace(/\%27/g, "'").replace(/\%2F/g, '/')
}

function URLencode (sStr) {
  // eslint-disable-next-line
  return escape(sStr).replace(/\+/g, '%2B').replace(/\"/g, '%22').replace(/\'/g, '%27').replace(/\//g, '%2F')
}

// 显示页面loading
function showLoading () {
  store.commit('updateLoadingStatus', {
    isLoading: true
  })
}

// 隐藏页面loading
function hiddenLoading () {
  store.commit('updateLoadingStatus', {
    isLoading: false
  })
}
// 判断当前webview是否支持passive
var passiveSupported = false
try {
  var options = Object.defineProperty({}, 'passive', {
    get: () => {
      passiveSupported = true
    }
  })
  window.addEventListener('passiveSupported', null, options)
} catch (error) {}

// 图片 url 转base64编码
function img2Base64 (img) {
  let canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  let ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, img.width, img.height)
  return canvas.toDataURL('image/png')
}

export default {
  // 获得元素的距离顶部的位置
  getOffsetTop,
  // 获得地址栏参数
  getQueryString,
  // 动画定位到目标元素
  scrollTo,
  // 解码方法
  URLDecode,
  // 展示loading
  showLoading,
  // 隐藏loading
  hiddenLoading,
  // 转码方法
  URLencode,
  // 是否支持passive
  passiveSupported,
  // 图片url转base64
  img2Base64
}