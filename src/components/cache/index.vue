<script>
  export default {
    name: 'vui-cache',
    abstract: true, // 这个必须加上，否则在transition组件中会有问题
    props: {
      type: {
        type: String,
        default: 'all',
        validator(value) {
          /**
           * all 前进、后退都使用缓存
           * back 只有后退才使用缓存
           * forward 只有前进才使用缓存
           * none 前进、后退都不使用缓存
           */
          return ['all', 'back', 'forward', 'none'].includes(value)
        }
      },
      exclude: {  // 排除哪些页面，这些页面始终不使用缓存
        type: Array,
        default() { // 路由name数组
          return []
        }
      },
      forceUpdate: {  // 强制不使用缓存
        type: Boolean,
        default: false
      }
    },
    render() {
      const vnode = this.$slots.default ? this.$slots.default[0] : null

      if (vnode) {
        const time = window.history.state.vuiCacheTime

        switch (this.action) {
          case 'new': // 新建历史记录
            // 删除弹出的历史记录并销毁相应的组件实例
            this.history.splice(++this.history.current).forEach(function (record) {
              record.vnode.componentInstance.$destroy()
            })
            this.history.push({
              time,
              vnode
            })

            break;
          default:  // 前进、后退或者spa页面内部replace
            const index = this.history.findIndex(function (record) {
              return record.time >= time
            })

            if (this.history[index] && this.history[index].time === time) {  // 有缓存
              this.history.current = index

              switch (this.action) {
                case 'replace': // spa页面内部replace
                  this.history[index].vnode.componentInstance.$destroy()
                  this.history[index] = {
                    time,
                    vnode
                  }

                  break
                default:  // 前进、后退
                  if ((this.action === 'back' ? ['all', 'back'] : ['all', 'forward']).includes(this.type) && !this.exclude.includes(this.$route.name) && !this.forceUpdate) { // 可以使用缓存
                    vnode.componentInstance = this.history[index].vnode.componentInstance
                  } else {
                    this.history[index].vnode.componentInstance.$destroy()
                    this.history[index] = {
                      time,
                      vnode
                    }
                  }
              }
            } else { // 刷新或者前进、后退时无缓存的情况
              this.history.current = index === -1 ? this.history.length : index
              this.history.splice(this.history.current, 0, {
                time,
                vnode
              })
            }
        }

        vnode.data.keepAlive = true
      }

      return vnode
    },
    watch: {
      $route: {
        handler() {
          switch (true) {
            case !window.history.state || !window.history.state.vuiCacheTime:  // 新建历史记录，或者replace（history.state会被清除）
              this.action = this.replace ? 'replace' : 'new'
              window.history.replaceState(Object.assign({}, window.history.state || {}, {
                vuiCacheTime: this.replace ? this.previousTime || Date.now() : Date.now()
              }), '')
              this.replace = false

              break
            case !this.time:  // 刷新，不会清除history.state
              this.action = 'refresh'

              break
            case window.history.state.vuiCacheTime < this.time:  // 后退
              this.action = 'back'

              break
            default:  // 前进
              this.action = 'forward'
          }

          this.time = window.history.state.vuiCacheTime
        },
        immediately: true
      }
    },
    created() {
      const replace = window.history.replaceState

      this.history = [] // 历史记录
      this.history.current = -1 // 当前页面位置
      // replace时history.state会被重置成null，所以要劫持（但仍无法解决location.replace的问题）
      window.history.replaceState = function () {
        this.replace = true
        this.previousTime = window.history.state && window.history.state.vuiCacheTime
        replace.apply(window.history, arguments)
      }.bind(this)

//      const replace = this.$router.replace
//
//      this.$router.replace = function () {
//        this.replace = true
//        this.previousTime = window.history.state && window.history.state.vuiCacheTime
//        replace.apply(this.$router, arguments)
//      }.bind(this)
    }
  }
</script>