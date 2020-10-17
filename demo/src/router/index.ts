import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import manifest from '../manifest'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  // ...(manifest.map(item => {
  //   return item.list
  // }).flat().map(item => {
  //   return {
  //     path: `/${item.enName}`,
  //     name: item.enName,
  //     component: () => import(`../../../src/component/${item.enName}/demo/index.vue`)
  //   }
  // }))
  ...manifest.map(module => {
    return {
      path: `/${module.lowerEnName}`,
      name: module.lowerEnName,
      component: () => import(`../../../src/modules/${module.lowerEnName}/demo/index.vue`)
    }
  })
]

const router = new VueRouter({
  routes
})

export default router
