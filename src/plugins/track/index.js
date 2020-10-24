import 'intersection-observer'

let instanceId = 0
const viewport = {}

  // ie polyfill
  ; (function () {
  try {
    // a : While a window.CustomEvent object exists, it cannot be called as a constructor.
    // b : There is no window.CustomEvent object
    // eslint-disable-next-line no-new
    new window.CustomEvent('T')
  } catch (e) {
    const CustomEvent = function (event, params) {
      params = params || { bubbles: false, cancelable: false, detail: undefined }

      const evt = document.createEvent('CustomEvent')

      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail)

      return evt
    }

    CustomEvent.prototype = window.Event.prototype
    window.CustomEvent = CustomEvent
  }
})()

class Track {
  install (Vue, { name, url, commonParams, dynamicParams = function () { }, callback } = {}) {
    this.name = name || 'track'
    this.url = url
    this.commonParams = commonParams // 公共参数
    this.dynamicParams = dynamicParams // 动态公共参数
    this.callback = callback // 自定义上报函数
    this.prefix = `__track_${instanceId++}_` // 这里使用instanceId，是为了区分各个实例（可能会创建多个指令），防止clear时互相影响
    this.observers = `${this.prefix}observers` // 指令dom元素中保存相关observer列表的键名
    this.track = `${this.prefix}track` // 指令dom元素中保存各种埋点类型回调方法列表的对象的键名
    this.deriveObservers = `${this.prefix}_derive_observers` // 保存以dom元素为root的observer的键名

    // 埋点指令，每次变化时必须整个替换指令的值，这样才能分辨出变化，不然binding.oldValue和binding.value就是同一个对象
    const bind = (el, { value, oldValue }) => {
      let tracks = value || []
      let oldTracks = oldValue || []

      tracks = tracks instanceof Array ? tracks : [tracks]
      oldTracks = oldTracks instanceof Array ? oldTracks : [oldTracks]

      // 判断新旧指令值是否有差异
      if (JSON.stringify(tracks, this.replacer) !== JSON.stringify(oldTracks, this.replacer) || this.rootIsDifferent(tracks, oldTracks)) {
        this.clear(el) // 移除事件
        tracks.forEach(track => {
          this.add(el, track)
        })
      }
    }

    Vue.directive(this.name, {
      bind,
      update: bind,
      unbind: el => {
        // 解绑指令时必须要清理事件
        this.clear(el)
      }
    })
  }

  // JSON.stringify时忽略掉dom元素
  replacer (key, value) {
    if (value instanceof window.HTMLElement) {
      return
    }

    return value
  }

  // 比较新旧指令值中的root是否一致（针对expose类型埋点）
  rootIsDifferent (tracks, oldTracks) {
    return tracks.some(function ({ type, options }, index) {
      if (type !== 'expose') {
        return
      }

      const root1 = options && options.root
      const root2 = oldTracks[index].options && oldTracks[index].options.root

      return root1 !== root2
    })
  }

  // 给元素绑定埋点事件
  add (el, { type, params, options }) {
    const oldOptions = options

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
        options = Object.assign(
          {
            root: null,
            rootMargin: '0px 0px 0px 0px',
            threshold: 0,
            reExpose: true  // 默认采用重复曝光
          },
          options
        )
        // 精度要高，确保1px的变化达不到这种精度，这样1px的变化就能区分是进入还是离开
        options.threshold += 0.000001

        const { rootMargin, threshold, reExpose } = options
        const root = options.root || viewport
        const observerKey = `${rootMargin}_${threshold}`
        /**
         * 区分是否以viewport为root，如果指定了root元素，将observer对象保存到root dom元素上，否则保存到this上
         * 绑定到root dom上时，如果root元素从页面移除了，observer对象也会被回收掉，可以避免内存泄漏
         */
        const observers = root[this.deriveObservers] = root[this.deriveObservers] || {}

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
          observers[observerKey] = new window.IntersectionObserver(entries => {
            entries.forEach(({ target, intersectionRatio }) => {
              let dispatched

              target[this.track][type]
                .filter(function (item) {
                  // 找出root、rootMargin、threshold相匹配的回调
                  return item.root === root && item.key === observerKey
                })
                .forEach(({ callback }) => {
                  // 显示
                  if (intersectionRatio >= threshold) {
                    callback()
                    // 不再重复曝光，清除曝光监听
                    if(!reExpose) {
                      this.clear(target)
                    }
                  }

                  // 每个observer只触发一次自定义事件
                  if (!dispatched) {
                    dispatched = true
                    target.dispatchEvent(
                      new window.CustomEvent('track_expose', {
                        bubbles: true,
                        cancelable: true,
                        // detail用来判断是哪个指令的哪个observer曝光/隐藏
                        detail: {
                          directive: this.name, // 指令名称
                          expose: intersectionRatio >= threshold, // 是显示还是隐藏
                          options: oldOptions && { ...oldOptions }
                        }
                      })
                    )
                  }
                })
            })
          }, options)
        }

        observers[observerKey].observe(el)
        el[this.observers] = el[this.observers] || []

        // 保存每个el相关的observer，以便清理
        if (
          !el[this.observers].find(function (observer) {
            return observer === observers[observerKey]
          })
        ) {
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
    el[this.observers] = []
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
    if (!this.url && !this.callback) {
      return
    }

    let url = `${this.url}?`

    params = Object.assign({}, this.commonParams, this.dynamicParams(), params)

    // callback比url优先级高
    if (this.callback) {
      return this.callback(params)
    }

    url += Object.keys(params)
      .map(function (key) {
        return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      })
      .join('&')
    new Image().src = url
  }
}

export { Track }
export default new Track()
