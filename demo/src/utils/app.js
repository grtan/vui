import Cookies from 'js-cookie'
import Tools from './tools'
import Toast from './toast'
class App {
  constructor () {
    if (!App.instance) {
      this.init()
      App.instance = this
    }
    return App.instance
  }
  init () {
    var cookies = Cookies.get()

    this.cookies = cookies

    // 是否是vivo手机
    this.isVivo = (/vivo/i.test(window.navigator.userAgent)) || ((document.cookie || '').indexOf('vvc_pc'))

    var vvcPn = cookies['vvc_pn']

    // 是否是游戏中心
    this.isGameCenter = vvcPn === 'com.vivo.game'

    // 是否是官网
    this.isSpace = vvcPn === 'com.vivo.space' || !!window.vivospace

    // 是否是应用商店
    this.isAppStore = vvcPn === 'com.bbk.appstore'

    // 是否是i音乐
    this.isiMusic = vvcPn === 'com.android.bbkmusic'

    // 是否是i主题
    this.isiTheme = vvcPn === 'com.bbk.theme'

    // 是否是vivo视频
    this.isVivoVideo = vvcPn === 'com.android.VideoPlayer'

    // 是否是vivo浏览器
    this.isVivoBrowser = /vivoBrowser/i.test(window.navigator.userAgent)

    // 判断是否是微信环境
    this.isWeiXQ = /(micromessenger|webbrowser)/i.test(navigator.userAgent)

    // 当前执行环境
    this.env = process.env.NODE_ENV
  }

  getOpenId () {
    var cookies = this.cookies
    let openid = cookies['vvc_openid'] || cookies['openid'] || cookies['vivo_account_cookie_iqoo_openid'] || Tools.getQueryString('openid')
    return openid
  }
  /**
   * 登录方法
   * @param {*} params
   */
  login (params = {}) {
    var callback = params.callback || function () {
      window.location.reload()
    }
    if (this.isSpace || this.isAppStore || this.isGameCenter || this.isiMusic) {
      window.onAccountsUpdate = callback
      var info = {
        info: {
          funName: 'onAccountsUpdate'
        }
      }
      return this.callClient('login', info)
    } else if (this.isiTheme) {
      /**
       * 当时i主题客户端提供给积分项目提供的PointInterface，没有提供更通用的名字，所以名字在app.js里面并不优雅
       * @param {String} 'login' login为客户端方法名，登录方法
       * @param {''} '' 空字符串，用作埋点，其他业务调用传空字符串即可
       */
      window.PointInterface.invokeLocal('login', '')
    } else {
      location.href = CONFIG.loginPath + '&redirect_uri=' + encodeURIComponent(params.callbackPath || location.href)
    }
  }
  /**
   * 查询当前环境是否支持分享
   */
  supportShare () {
    // 如果是官网需判断分享方法是否存在，存在才支持
    if (this.isSpace && window.vivospace && window.vivospace.doshare && window.vivospace.setShareChannelData) {
      return true
    }
    // 如果处于浏览器或视频的沉浸式环境，判断是否支持
    if ((this.isVivoBrowser || this.isVivoVideo) && window.vivoNoodlesVideo && window.vivoNoodlesVideo.onNoodlesVideoShare) {
      return true
    }
    // 如果应用商店则支持分享，其他认为不支持
    if (this.isAppStore) {
      return true
    }
    return false
  }
  /**
   * 调用客户端分享功能
   * @param {*} param0
   */
  doShare ({
    title = '',
    weiTitle = '',
    weiImg = '',
    weiLink = ''
  }) {
    // 如果是官方商城
    if (this.isAppStore) {
      var info = {
        info: {
          title,
          summary: weiTitle,
          imageUrl: weiImg,
          sharedUrl: weiLink
        }
      }
      return this.callClient('showShare', info)
    }

    // 如果是官网
    if (this.isSpace) {
      var shareObject = {
        title,
        weiTitle,
        weiImg,
        weiLink
      }
      var shareDetail = {
        qqspace: shareObject,
        qqfriend: shareObject,
        wxfriend: shareObject,
        wxspace: shareObject,
        weibo: shareObject
      }
      window.vivospace.setShareChannelData(JSON.stringify(shareDetail))
      window.vivospace.doshare()
      return
    }

    // 如果是视频或浏览器
    if (this.isVivoVideo || this.isVivoBrowser) {
      let img = document.createElement('img')
      img.crossOrigin = '*'
      img.src = weiImg
      let data
      img.onload = function () {
        data = Tools.img2Base64(img).split(',')[1]
        let params = {
          // 视频&浏览器分享特定参数——专题ID
          topicId: '',
          url: weiLink,
          topicTitle: title,
          shareImgUrl: weiImg,
          shareImg: data
        }
        try {
          window.vivoNoodlesVideo.onNoodlesVideoShare(JSON.stringify(params))
        } catch (error) {
          Toast('分享调起发生错误')
        }
      }
      return
    }
    Toast('仅支持官网APP、商店APP、vivo视频和vivo浏览器')
  }
  /**
   * 拷贝文本
   * @param {*} text
   */
  copy (text) {
    window.vivojsbridge.copy({
      'text': text || ''
    })
    // 非客户端暂时不支持粘贴
    if (this.isSpace || this.isAppStore || this.isGameCenter) {
      Toast('已复制到粘贴板')
    } else {
      console.warn('当前客户端不能使用copy方法，仅限在应用商店、游戏中心、官网中使用')
    }
  }

  /**
   * 打开对应客户端的webview中的地址
   * @param {*} nativeType
   * @param {*} url
   */
  openVivoNativeURL (nativeType, url) {
    if (nativeType === 'game') {
      location.href = `vivogame://game.vivo.com/openjump?j_type=9&h5_link=${url}`
    } else if (nativeType === 'space') {
      location.href = `space://vivo.com/web?uri=${url}`
    } else if (nativeType === 'store') {
      location.href = `vivomarket://webview?url=${url}`
    } else {
      location.href = url
    }
  }

  callClient (funName, data) {
    if (!(this.isSpace || this.isAppStore || this.isGameCenter || this.isiMusic)) {
      Toast('该功能不支持WAP端')
      return
    }
    if (typeof data === 'object') {
      if (!data['webErrorCatch']) {
        // 出错情况的回调
        data.webErrorCatch = 'BRIDGE_CALLBACK'
      }
      if (!data['localErrorCatch']) {
        data.localErrorCatch = 'true'
      }
      data = JSON.stringify(data)
    }
    // 全局其它异常情况回调
    window.BRIDGE_CALLBACK = function () {
      console.log('对不起，你的版本过低，不能使用该功能')
    }
    return window[this.isiMusic ? 'iMusicWebClient' : 'AppWebClient'].invokeLocal(funName, data)
  }
}
export default Object.freeze(new App())