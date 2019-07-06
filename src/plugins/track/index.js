import 'intersection-observer'

class Track {
  install (Vue, {name, url, commonParams, dynamicParams} = {}) {
    this.url = url
    this.commonParams = commonParams
    this.dynamicParams = dynamicParams || function () {}
    this.prefix = `__track__${('' + Date.now()).substr(-5)}__`
    this.observers = `${this.prefix}observers` // 指令dom元素中保存相关observer列表的键名
    this.track = `${this.prefix}track` // 指令dom元素中保存各种埋点类型回调方法列表的对象的键名
    this.deriveObservers = `${this.prefix}_derive_observers` // 保存以dom元素为root的observer的键名

    //埋点指令，每次变化时必须整个替换指令的值，这样才能分辨出变化，不然binding.oldValue和binding.value就是同一个对象
    const bind = (el, {value, oldValue}) => {
      let tracks = value || []
      let oldTracks = oldValue || []

      tracks = tracks instanceof Array ? tracks : [tracks]
      oldTracks = oldTracks instanceof Array ? oldTracks : [oldTracks]

      if (JSON.stringify(tracks) !== JSON.stringify(oldTracks)) {
        this.clear(el) // 移除事件
        tracks.forEach(track => {
          this.add(el, track)
        })
      }
    }

    Vue.directive(name || 'track', {
      bind,
      update: bind,
      unbind: el => {
        // 解绑指令时必须要清理事件
        this.clear(el)
      }
    })
  }

  // 给元素绑定埋点事件
  add (el, {type, params, options}) {
    el[this.track] = el[this.track] || {}
    el[this.track][type] = el[this.track][type] || []

    switch (type) {
      case 'create': // 页面加载
        el[this.track][type].push(() => {
          this.send(params)
        })
        el[this.track][type].slice(-1)[0]()
        break
      case 'expose': // 曝光
        options = Object.assign({
          root: null,
          rootMargin: '0px 0px 0px 0px',
          threshold: 0
        }, options)
        // 精度要高，确保1px的变化达不到这种精度，这样1px的变化就能区分是进入还是离开
        options.threshold += 0.000001

        const {rootMargin, threshold} = options
        const root = options.root || this
        const observerKey = `${rootMargin}_${threshold}`
        let observers

        /**
         * 区分是否以viewport为root，如果指定了root元素，将observer对象保存到root dom元素上，否则保存到this上
         * 绑定到root dom上时，如果root元素从页面移除了，observer对象也会被回收掉，可以避免内存泄漏
         */
        observers = root[this.deriveObservers] = root[this.deriveObservers] || {}
        // 将参数保存到el中
        el[this.track][type].push({
          root,
          key: observerKey,
          callback: () => {
            this.send(params)
          }
        })

        // 以rootMargin_threshold为键名，来保存不同选项的observer对象
        if (!observers[observerKey]) {
          observers[observerKey] = new IntersectionObserver(entries => {
            entries.forEach(({target, intersectionRatio}) => {
              if (intersectionRatio < threshold) { // 隐藏
                return
              }

              target[this.track][type].filter(function (item) {
                // 找出root、rootMargin、threshold相匹配的回调
                return item.root === root && item.key === observerKey
              }).forEach(function ({callback}) {
                callback()
              })
            })
          }, options)
        }

        observers[observerKey].observe(el)
        el[this.observers] = el[this.observers] || []

        // 保存每个el相关的observer，以便清理
        if (!el[this.observers].find(function (observer) {
            return observer === observers[observerKey]
          })) {
          el[this.observers].push(observers[observerKey])
        }

        break
      case 'click': // 点击
        el[this.track][type].push(() => {
          this.send(params)
        })
        el.addEventListener(type, el[this.track][type].slice(-1)[0])
        break
    }
  }

  // 清理元素埋点事件
  clear (el) {
    // 停止observe监听
    el[this.observers] = el[this.observers] || []
    el[this.observers].forEach(function (observer) {
      observer.unobserve(el)
    })
    // 清空各种埋点类型的回调
    el[this.track] = el[this.track] || {}
    Object.keys(el[this.track]).forEach(type => {
      switch (type) {
        case 'click':
          el[this.track][type].forEach(function (callback) {
            el.removeEventListener(type, callback)
          })
          break
      }

      el[this.track][type] = []
    })
  }

  // 发送埋点请求
  send (params) {
    let url = `${this.url}?`

    params = Object.assign({}, this.commonParams, this.dynamicParams(), params)
    url += Object.keys(params).map(function (key) {
      return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    }).join('&')
    new Image().src = url
  }
}

export default new Track()