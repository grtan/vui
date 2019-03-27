var mark = (function () {
  var imgs = []
  return function (params) {
    var img = new Image()
    imgs.push(img)
    var dataStr = ''
    for (var key in params) {
      dataStr += '&' + key + '=' + encodeURIComponent(params[key])
    }
    /* eslint-disable */
    img.src = CONFIG.stPath + '?' + dataStr
    img.onerror = clear()
    img.onload = clear()
  }

  function clear() {
    imgs = []
  }
})()
export default mark
