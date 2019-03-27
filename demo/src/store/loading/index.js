// 定义store对象
var num = 0
const loading = {
  state: {
    isLoading: true
  },
  actions: {

  },
  mutations: {
    updateLoadingStatus (state, payload) {
      if (payload.isLoading) {
        num++
        if (payload.immediately) {
          setTimeout(() => {
            if (num > 0) {
              state.isLoading = true
            }
          })
        } else {
          setTimeout(() => {
            if (num > 0) {
              state.isLoading = true
            }
          }, 300)
        }
      } else {
        num--
        if (num === 0) {
          state.isLoading = false
        }
      }
    }
  }
}

export default loading