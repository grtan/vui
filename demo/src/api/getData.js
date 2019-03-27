import fetch from '../utils/fetch'
export default {
  /**
   * {API描述}
   */
  getInfo (params) {
    return fetch({
      url: 'http://api.vivo.xyz/mockApi/usrsys/api/test/getData',
      prodUrl: 'http://api.vivo.xyz/mockApi/usrsys/api/test/getData',
      method: 'post',
      params
    })
  },
  getInfo1 (params) {
    return fetch({
      url: 'hddd/dddd',
      prodUrl: 'http://api.vivo.xyz/mockApi/usrsys/api/test/getData',
      method: 'post',
      params
    })
  }
}
