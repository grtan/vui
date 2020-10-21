import { PluginObject } from 'vue'
import VueRouter from 'vue-router'
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from '@/utils/store'
import { extendVue } from '@/utils/extend'

// 记录访问时间的state名称
const name = `${namespace}Time`
let replace: InstanceType<typeof VueRouter>['replace']
let previousTime: number // 上一次时间
let replaceTime: number // replace前的历史记录的访问时间

@Component
class HistoryAction extends Vue {
  created() {
    if (!this.$router || replace) {
      return
    }

    // replace时history.state会被重置成null，所以要劫持（但仍无法解决location.replace的问题）
    replace = this.$router.replace.bind(this.$router)
    this.$router.replace = function (...args: Parameters<HistoryAction['$router']['replace']>) {
      replaceTime = history?.state?.[name] ?? Date.now()

      return replace(...args)
    } as any

    this.$router.afterEach(() => {
      let action: 'new' | 'forward' | 'back' | 'refresh' | 'replace' // 操作：新建、前进、后退、刷新还是replace

      switch (true) {
        case !history?.state?.[name]: // 新建历史记录，或者replace（history.state会被清除）
          action = replaceTime ? 'replace' : 'new'
          history.replaceState(
            Object.assign({}, history.state || {}, {
              [name]: replaceTime || Date.now()
            }),
            ''
          )

          break
        case !previousTime || history.state[name] === previousTime: // 刷新，不会清除history.state
          action = 'refresh'

          break
        case history.state[name] < previousTime: // 后退
          action = 'back'

          break
        default:
          // 前进
          action = 'forward'
      }

      extendVue('historyAction', action)
      previousTime = history.state[name]
      replaceTime = 0
    })
  }
}

const plugin: PluginObject<any> = {
  install(Vue) {
    Vue.mixin(HistoryAction)
  }
}

export default plugin
