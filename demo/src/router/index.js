import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/'
Vue.use(Router)

let router = new Router({
  routes: [{
    name: 'index',
    path: '/',
    meta: {
      title: '首页'
    },
    component: () =>
      import(/* webpackChunkName: "home" */ '@/views/Index/Index.vue')
  }, {
    name: 'button',
    path: '/components/button',
    meta: {
      title: 'button 按钮'
    },
    component: () =>
      import(/* webpackChunkName: "button" */ '@/views/components/button/index.vue')
  }, {
    name: 'navbar',
    path: '/components/navbar',
    meta: {
      title: 'navbar 导航栏'
    },
    component: () =>
      import(/* webpackChunkName: "navbar" */ '@/views/components/navbar/index.vue')
  }, {
    name: 'icon',
    path: '/components/icon',
    meta: {
      title: 'icon 图标'
    },
    component: () =>
      import(/* webpackChunkName: "icon" */ '@/views/components/icon/index.vue')
  }, {
    name: 'layer',
    path: '/components/layer',
    meta: {
      title: 'layer 蒙层'
    },
    component: () =>
      import(/* webpackChunkName: "layer" */ '@/views/components/layer/index.vue')
  }, {
    name: 'popup',
    path: '/components/popup',
    meta: {
      title: 'popup 弹层'
    },
    component: () =>
      import(/* webpackChunkName: "popup" */ '@/views/components/popup/index.vue')
  }, {
    name: 'toast',
    path: '/components/toast',
    meta: {
      title: 'toast 提示'
    },
    component: () =>
      import(/* webpackChunkName: "toast" */ '@/views/components/toast/index.vue')
  }, {
    name: 'dialog',
    path: '/components/dialog',
    meta: {
      title: 'dialog 对话框'
    },
    component: () =>
      import(/* webpackChunkName: "dialog" */ '@/views/components/dialog/index.vue')
  }, {
    name: 'picker',
    path: '/components/picker',
    meta: {
      title: 'picker 滚动选择器'
    },
    component: () =>
      import(/* webpackChunkName: "picker" */ '@/views/components/picker/index.vue')
  }, {
    name: 'popup-picker',
    path: '/components/popup-picker',
    meta: {
      title: 'popup-picker 弹层选择器'
    },
    component: () =>
      import(/* webpackChunkName: "popup-picker" */ '@/views/components/popup-picker/index.vue')
  }, {
    name: 'city-picker',
    path: '/components/city-picker',
    meta: {
      title: 'city-picker 省市区选择'
    },
    component: () =>
      import(/* webpackChunkName: "city-picker" */ '@/views/components/city-picker/index.vue')
  }]
})

router.beforeResolve(function (to, from, next) {
  store.commit('updateLoadingStatus', {
    isLoading: true,
    immediately: true
  })
  next()
})

router.afterEach(function (transition) {
  if (transition.matched.length === 0) {
    store.commit('updateLoadingStatus', {
      isLoading: false
    })
    store.commit('setError', {
      msg: '页面飞走了，请检查您访问的页面地址',
      show: true
    })
    return
  } else {
    // 防止404恢复
    store.commit('setError', {
      show: false
    })
  }
  store.commit('updateLoadingStatus', {
    isLoading: false
  })
  // 路由切换动态更改title
  document.title = transition.meta.title || transition.meta.name || ''
  store.commit({
    type: 'setTitle',
    title: transition.meta.title
  })
})

export default router
