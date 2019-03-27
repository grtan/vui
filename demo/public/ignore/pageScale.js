;
(function (win, document) {
  var documentEl = document.documentElement
  var maxwidth = 540
  var dpr = devicePixelRatio === 4 ? 1 : devicePixelRatio
  var tid = null
  documentEl.dataset.dpr = dpr
  var designScale = (documentEl.dataset.width || 1080) / 100
  var rootFontSize = parseFloat(getComputedStyle(documentEl).fontSize)
  var refreshRem = function () {
    var width = documentEl.clientWidth
    if (width / dpr > maxwidth) {
      width = maxwidth * 1
    }
    documentEl.style.fontSize = width / designScale / rootFontSize * 100 + '%'
  }
  refreshRem()
  win.addEventListener('resize', function () {
    clearTimeout(tid)
    tid = setTimeout(refreshRem, 300)
  }, false)
  win.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      clearTimeout(tid)
      tid = setTimeout(refreshRem, 300)
    }
  }, false)
  win.addEventListener('DOMContentLoaded', function (e) {
    var body = document.getElementsByTagName('body')[0]
    body.style.maxWidth = designScale + 'rem'
    body.style.margin = '0 auto'
  }, false)
})(window, document)