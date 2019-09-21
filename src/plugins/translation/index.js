import merge from 'lodash/merge'
import VueI18n from 'vue-i18n'
import { libName } from '../../config'
import zhCN from '../../lang/zh-CN'

const defaultName = `${libName}-translation`
const defaultLocale = 'zh-CN'
const defaultMessages = zhCN

export default {
  install (Vue, { name = defaultName, locale = defaultLocale, fallbackLocale = defaultLocale, messages, ...rest } = {}) {
    // 必须在Vue.use(VueI18n)之前执行
    Vue.mixin({
      beforeCreate () {
        if (this.$options.name !== name) {
          return
        }

        this.$options.i18n = new VueI18n({
          locale,
          fallbackLocale,
          // 始终包含中文，深拷贝合并，防止多个组件实例共用一个对象
          messages: merge({}, messages, defaultMessages),
          ...rest
        })
      }
    })
    Vue.use(VueI18n)
    Vue.component(name, {
      render () {
        return this.$slots.default && this.$slots.default[0]
      }
    })
  }
}
