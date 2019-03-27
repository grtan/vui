import Vue from 'vue'
import App from '@/App.vue'
import {
  sync
} from 'vuex-router-sync'
import router from '@/router'
import store from '@/store/'
import directives from '@/directive'
import {
  ToastPlugin
} from '@vivo/vivo-ui'
import { PToast, PDialog } from 'vui'

Vue.use(ToastPlugin)
Vue.use(PToast)
Vue.use(PDialog)
/* eslint-disable  */
import vivojsbridge from '@vivo/vivojsbridge/dist/vivo_native.js'
window.vivojsbridge = vivojsbridge
//将router注册到store
sync(store, router)
// 将自定义指令注册到vue中
Object.keys(directives).forEach(key => {
  Vue.use(directives[key])
})
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 跟随文档切换界面
window.addEventListener('message', function (e) {
  if (e.data.type === 'vui') {
    location.replace(e.data.hash.replace(/^#\/src/, '#'))
  }
})