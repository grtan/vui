import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import manifest from '../manifest'

type ArrayElem<A> = A extends Array<infer Elem> ? Elem : never

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  ...manifest.map(({ list }) => {
    return (list as Array<ArrayElem<typeof list>>).map((item) => {
      if (!(item as any).list) {
        return item
      }

      return (item as any).list
    }).flat()
  }).flat().map(({ lowerEnName }) => {
    return {
      path: `/${lowerEnName}`,
      name: lowerEnName,
      component: () => import(`../../../src/modules/${lowerEnName}/demo/index.vue`)
    }
  })
]

const router = new VueRouter({
  routes
})

export default router
