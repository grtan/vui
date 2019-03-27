import Vue from 'vue'
import Vuex from 'vuex'
import loading from './loading/'
import error from './error/'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    loading,
    error
  },
  state: {
    title: ''
  },
  mutations: {
    setTitle (state, {title}) {
      state.title = title
    }
  }
})