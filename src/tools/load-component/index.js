const loadEvent = `__load__${Date.now()}` // 组件加载完成事件
const Fail = {  // 组件加载失败时使用自定义的Fail组件，以此来触发loadEvent事件
  functional: true,
  abstract: true,
  render(h, context) {
    // 触发load失败事件
    context.listeners[loadEvent](false)

    return null
  }
}

function loadComponent (options) {
  const {Component, Loading, Error, delay, duration, timeout, customLoad} = Object.assign({
    // 全局配置可以设置到loadComponent上
    Loading: loadComponent.Loading,
    Error: loadComponent.Error,
    delay: loadComponent.delay !== undefined ? loadComponent.delay : 100,
    duration: loadComponent.duration !== undefined ? loadComponent.duration : 500,
    timeout: loadComponent.timeout !== undefined ? loadComponent.timeout : Infinity,
    customLoad: loadComponent.customLoad || false // 是否自定义load事件，默认为组件加载完成就触发，否则需要在组件内手动$emit('custom-load', status)
  }, options)

  return function (resolve) {
    resolve({
      render() {
        return (
          <span>
            {Loading && this.canShowLoading && this.status === 'loading' ? <loading></loading> : ''}
            {Error && this.status === 'fail' ? <error></error> : ''}
            <v-component vOn:custom-load={this.onCustomLoad} {
              ...{
                style: this.componentStyle,
                on: {
                  [loadEvent]: this.onLoad
                }
              }
            }></v-component>
          </span>
        )
      },
      components: {
        VComponent() {
          // 组件的加载时长最大为timeout
          return Promise.race([Promise.resolve(typeof Component === 'function' ? new Promise(function (resolve, reject) {
            const result = Component(resolve, reject)

            // 返回结果是promise，这里不支持vue v2.3.0+新增的工厂函数返回非promise对象的写法
            if (result && typeof result.then === 'function') {
              resolve(result)
            }
          }) : Component).then(function (component) {
            // 保持跟vue框架一致，工厂函数形式的组件兼容commonjs引入的es6模块
            if (component.__esModule && component.default) {
              component = component.default
            }

            component.mixins = component.mixins || []
            component.mixins.push({
              beforeCreate() {
                this.$emit(loadEvent, true)
              }
            })

            return component
          }).catch(function () {
            return Fail
          }), new Promise(function (resolve) {
            if (isFinite(timeout) && timeout >= 0) {
              setTimeout(function () {
                resolve(Fail)
              }, timeout)
            }
          })])
        },
        Loading(resolve, reject) { // 这里使用函数形式，是为了利用vue框架兼容commonjs引入的es6模块
          // 支持vue组件的各种写法
          if (typeof Loading === 'function') {
            return Loading(resolve, reject)
          } else {
            resolve(Loading)
          }
        },
        Error(resolve, reject) {
          if (typeof Error === 'function') {
            return Error(resolve, reject)
          } else {
            resolve(Error)
          }
        }
      },
      data() {
        return {
          canShowLoading: false,
          status: 'loading'
        }
      },
      computed: {
        componentStyle() {
          return {
            display: (() => {
              if (Loading && this.canShowLoading && this.status === 'loading') {
                return 'none'
              }

              if (Error && this.status === 'fail') {
                return 'none'
              }

              return ''
            })()
          }
        }
      },
      methods: {
        onLoad(success) { // 组件加载
          if (!success || !customLoad) {
            this.onCustomLoad(success)
          }
        },
        onCustomLoad(success) { // 自定义加载事件
          if (this.loadFinish) {
            return
          }

          this.loadFinish = true
          // loading组件如果显示了，最少显示duration ms
          setTimeout(() => {
            this.status = success ? 'success' : 'fail'
          }, Loading && this.canShowLoading ? duration : 0)
        }
      },
      created() {
        // 超过delay时间加载的组件还没有load，才显示loading
        setTimeout(() => {
          this.canShowLoading = true
        }, delay)
      }
    })
  }
}

export default loadComponent