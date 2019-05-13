import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/'
Vue.use(Router)

let router = new Router({
  routes: [
    {
      name: 'index',
      path: '/',
      meta: {
        title: '首页'
      },
      component: () =>
        import(/* webpackChunkName: "home" */ '@/views/Index/Index.vue')
    },
    // 基础
    {
      name: 'button',
      path: '/components/button',
      meta: {
        title: 'button 按钮'
      },
      component: () =>
        import(/* webpackChunkName: "button" */ '@/views/components/button/index.vue')
    }, {
      name: 'icon',
      path: '/components/icon',
      meta: {
        title: 'icon 图标'
      },
      component: () =>
        import(/* webpackChunkName: "icon" */ '@/views/components/icon/index.vue')
    },
    // 导航
    {
      name: 'navbar',
      path: '/components/navbar',
      meta: {
        title: 'navbar 导航栏'
      },
      component: () =>
        import(/* webpackChunkName: "navbar" */ '@/views/components/navbar/index.vue')
    },
    {
      name: 'pagination',
      path: '/components/pagination',
      meta: {
        title: 'pagination 分页'
      },
      component: () =>
        import(/* webpackChunkName: "pagination" */ '@/views/components/pagination/index.vue')
    },
    // 反馈
    {
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
    },
    // 数据输入
    {
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
    }, {
      name: 'switch',
      path: '/components/switch',
      meta: {
        title: 'switch 开关'
      },
      component: () =>
        import(/* webpackChunkName: "switch" */ '@/views/components/switch/index.vue')
    },
    // 数据展示
    {
      name: 'swiper',
      path: '/components/swiper',
      meta: {
        title: 'swiper 轮播'
      },
      component: () =>
        import(/* webpackChunkName: "swiper" */ '@/views/components/swiper/index.vue')
    },
    // 其他
    {
      name: 'cache',
      path: '/components/cache',
      meta: {
        title: 'cache 页面缓存'
      },
      component: () =>
        import(/* webpackChunkName: "cache" */ '@/views/components/cache/index.vue')
    }, {
      name: 'cache-page1',
      path: '/components/cache/page1',
      meta: {
        title: 'cache page1'
      },
      component: () =>
        import(/* webpackChunkName: "cache-page1" */ '@/views/components/cache/page1.vue')
    }, {
      name: 'cache-page2',
      path: '/components/cache/page2',
      meta: {
        title: 'cache page2'
      },
      component: () =>
        import(/* webpackChunkName: "cache-page2" */ '@/views/components/cache/page2.vue')
    }, {
      name: 'timer',
      path: '/components/timer',
      meta: {
        title: 'timer 计时器'
      },
      component: () =>
        import(/* webpackChunkName: "timer" */ '@/views/components/timer/index.vue')
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
