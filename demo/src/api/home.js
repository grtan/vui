import fetch from '../utils/fetch'
export default {
  getInfo (params) {
    return fetch({
      url: '/api/home/getinfo.do',
      method: 'get',
      params
    })
  }
}