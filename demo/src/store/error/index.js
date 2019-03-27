const error = {
  state: {
    msg: '',
    show: false
  },
  actions: {

  },
  mutations: {
    setError (state, payload) {
      state.msg = payload.msg
      state.show = payload.show
    }
  }
}

export default error