<script>
  import { mixin, name } from '../../mixins/history/index'

  export default {
    name: 'vui-cache',
    abstract: true, // 这个必须加上，否则在transition组件中会有问题
    mixins: [mixin],
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
          return ['all', 'back', 'forward', 'none'].indexOf(value) !== -1
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
        const time = window.history.state[name]

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
                  if ((this.action === 'back' ? ['all', 'back'] : ['all', 'forward']).indexOf(this.type) !== -1 && this.exclude.indexOf(this.$route.name) === -1 && !this.forceUpdate) { // 可以使用缓存
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
    created() {
      this.history = [] // 历史记录
      this.history.current = -1 // 当前页面位置
    }
  }
</script>