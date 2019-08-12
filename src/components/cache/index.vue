<script>
import { mixin, name } from '../../mixins/history/index'
import { libName } from '../../config'

const prefix = `__${libName}__`

export default {
  name: 'vui-cache',
  abstract: true, // 这个必须加上，否则在transition组件中会有问题
  mixins: [mixin],
  props: {
    type: {
      type: String,
      default: 'all',
      validator (value) {
        /**
         * all 前进、后退都使用缓存
         * back 只有后退才使用缓存
         * forward 只有前进才使用缓存
         * none 前进、后退都不使用缓存
         */
        return ['all', 'back', 'forward', 'none'].indexOf(value) !== -1
      }
    },
    recordScrollPosition: { // 是否记录滚动位置
      type: Boolean,
      default: true
    },
    exclude: { // 排除哪些页面，这些页面始终不使用缓存
      type: Array,
      default () { // 路由name数组
        return []
      }
    },
    forceUpdate: { // 强制不使用缓存
      type: Boolean,
      default: false
    }
  },
  render () {
    const vnode = this.$slots.default ? this.$slots.default[0] : null

    if (vnode) {
      if (this.action) { // 由于路由变化引起的渲染
        const time = window.history.state[name]
        const last = this.history[this.history.current]

        /**
         * 保存组件根元素及其父元素的滚动位置
         * 将信息保存在dom元素上，滚动位置是跟dom元素相关的，防止有些组件中途替换根dom元素
         */
        if (last) {
          const el = last.vnode.componentInstance.$el

          el[`${prefix}scrollTop`] = el.scrollTop
          el[`${prefix}scrollLeft`] = el.scrollLeft
          el[`${prefix}parentScrollTop`] = el.parentElement.scrollTop
          el[`${prefix}parentScrollLeft`] = el.parentElement.scrollLeft
        }

        switch (this.action) {
          case 'new': // 新建历史记录
          case 'refresh': // 刷新
            // 删除弹出的历史记录并销毁相应的组件实例
            this.history.splice(++this.history.current).forEach(function (record) {
              record.vnode.componentInstance.$destroy()
            })
            this.history.push({
              time,
              vnode
            })

            break
          default: // 前进、后退或者spa页面内部replace
            const index = this.history.findIndex(function (record) {
              return record.time >= time
            })

            if (this.history[index] && this.history[index].time === time) { // replace或者前进、后退有缓存
              this.history.current = index

              switch (this.action) {
                case 'replace': // spa页面内部replace
                  this.history[index].vnode.componentInstance.$destroy()
                  this.history[index] = {
                    time,
                    vnode
                  }

                  break
                default: // 前进、后退
                  if ((this.action === 'back' ? ['all', 'back'] : ['all', 'forward']).indexOf(this.type) !== -1 && this.exclude.indexOf(this.$route.name) === -1 && !this.forceUpdate) { // 可以使用缓存
                    vnode.componentInstance = this.history[index].vnode.componentInstance
                    // 渲染完成后恢复滚动位置
                    this.recordScrollPosition && this.$nextTick(function () {
                      const el = vnode.componentInstance.$el

                      if (el[`${prefix}scrollTop`] !== undefined) {
                        el.scrollTop = el[`${prefix}scrollTop`]
                        el.scrollLeft = el[`${prefix}scrollLeft`]
                        el.parentElement.scrollTop = el[`${prefix}parentScrollTop`]
                        el.parentElement.scrollLeft = el[`${prefix}parentScrollLeft`]
                      }
                    })
                  } else {
                    this.history[index].vnode.componentInstance.$destroy()
                    this.history[index] = {
                      time,
                      vnode
                    }
                  }
              }
            } else { // 前进、后退时无缓存的情况，index=-1为前进无缓存的情况，否则为后退无缓存
              this.history.current = index === -1 ? this.history.length : index
              this.history.splice(this.history.current, 0, {
                time,
                vnode
              })
            }
        }
      } else if (this.history[this.history.current]) { // 由于祖先组件数据变化引起的渲染
        vnode.componentInstance = this.history[this.history.current].vnode.componentInstance
      }

      vnode.data.keepAlive = true
    }

    // 路由变化渲染完后，将标记清除
    this.action = ''

    return vnode
  },
  created () {
    this.history = [] // 历史记录
    this.history.current = -1 // 当前页面位置
  }
}
</script>
