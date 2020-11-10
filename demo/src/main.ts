import 'reflect-metadata'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import HistoryAction from '../../src/modules/history-action'

Vue.config.productionTip = false
Vue.use(HistoryAction, router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 跟随文档切换界面
window.addEventListener('message', function (e) {
  if (e.data.type === 'vui') {
    router.replace(`/${e.data.module || ''}`)
  }
})
