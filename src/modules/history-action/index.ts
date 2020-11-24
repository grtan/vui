import { PluginObject } from 'vue'
import VueRouter from 'vue-router'
import { namespace } from '@/utils/store'
import { extendVue } from '@/utils/extend'

// 记录访问时间的state名称
const name = `${namespace}Time`
let replace: InstanceType<typeof VueRouter>['replace'] | undefined
let previousTime: number // 上一次时间
let replaceTime: number // replace前的历史记录的访问时间

const plugin: PluginObject<InstanceType<typeof VueRouter>> = {
  install(Vue, router) {
    if (replace) {
      return
    }

    // replace时history.state会被重置成null，所以要劫持（但仍无法解决location.replace的问题）
    replace = router!.replace.bind(router)
    router!.replace = function (...args: Parameters<VueRouter['replace']>) {
      replaceTime = history?.state?.[name] ?? Date.now()

      return replace!(...args)
    } as any

    router!.afterEach(() => {
      let action: 'new' | 'forward' | 'back' | 'refresh' | 'replace' // 操作：新建、前进、后退、刷新还是replace

      switch (true) {
        // replace，老版本vue-router replace时会清除原来的history.state，新版本会保留
        case !!replaceTime:
          action = 'replace'
          history.replaceState(
            Object.assign({}, history.state || {}, {
              [name]: replaceTime
            }),
            ''
          )
          break
        // 新建历史记录
        case !history?.state?.[name]:
          action = 'new'
          history.replaceState(
            Object.assign({}, history.state || {}, {
              [name]: Date.now()
            }),
            ''
          )
          break
        // 刷新，不会清除history.state
        case !previousTime || history.state[name] === previousTime:
          action = 'refresh'
          break
        // 后退
        case history.state[name] < previousTime:
          action = 'back'
          break
        // 前进
        default:
          action = 'forward'
      }

      extendVue(Vue, 'historyAction', action)
      previousTime = history.state[name]
      replaceTime = 0
    })
  }
}

export default plugin
