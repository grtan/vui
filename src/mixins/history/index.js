let replace
let isReplace
let time
let previousTime   // replace前的历史记录的访问时间
let action  // 操作：前进、后退、刷新还是replace

export const name = 'vuiTime'  // 记录访问时间的state名称
export const mixin = {
  data() {
    return {
      action: ''
    }
  },
  watch: {
    $route() {
      if (!action) {  // 还未判断出操作是啥
        switch (true) {
          case !window.history.state || !window.history.state[name]:  // 新建历史记录，或者replace（history.state会被清除）
            action = isReplace ? 'replace' : 'new'
            window.history.replaceState(Object.assign({}, window.history.state || {}, {
              [name]: isReplace ? previousTime || Date.now() : Date.now()
            }), '')

            break
          case !time || window.history.state[name] === time:  // 刷新，不会清除history.state
            action = 'refresh'

            break
          case window.history.state[name] < time:  // 后退
            action = 'back'

            break
          default:  // 前进
            action = 'forward'
        }

        time = window.history.state[name]
      }

      this.action = action
      this.$nextTick(function () {
        action = ''
        isReplace = false
      })
    }
  },
  created() {
    if (!replace) {
      replace = this.$router.replace.bind(this.$router)
      // replace时history.state会被重置成null，所以要劫持（但仍无法解决location.replace的问题）
      this.$router.replace = function () {
        isReplace = true
        previousTime = window.history.state && window.history.state[name]
        replace(...arguments)
      }
    }
  }
}