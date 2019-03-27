import API from '@/api'
const stat = {}
stat.install = (Vue, options = {}) => {
  Vue.directive('stat', {
    bind: function (el, datas) {
      let dataValue = datas.value
      if (!dataValue) {
        return
      }
      var items = Object.prototype.toString.call(dataValue) === '[object Array]' ? dataValue : [dataValue]
      items.forEach(item => {
        if (item.act === 'show') {
          setTimeout(() => {
            if (el.clientHeight !== 0 && !el.hidden) {
              API.mark(item.params)
            }
          })
        } else {
          el.addEventListener(item.act, API.mark.bind({}, item.params), true)
        }
      })
    }
  })
}
export default stat
