import Toast from '../../components/toast/index.vue'

export default {
  install (Vue) {
    const list = []

    Toast.mixins = [{
      created () {
        list.push(this.list)
      }
    }]

    const vm = new Vue({
      components: {
        Toast
      },
      el: document.body.appendChild(document.createElement('div')),
      data: {
        slot: '',
        ...(function () {
          const defaults = {}

          Object.keys(Toast.props).forEach(function (key) {
            defaults[key] = Toast.props[key].default
          })

          return defaults
        }())
      },
      render () {
        return (
          <toast ref="toast" class="vui-toast-plugin" {...{
            props: {
              className: this.className,
              time: this.time,
              position: this.position,
              single: this.single
            }
          }}>
            <div {...{
              domProps: {
                innerHTML: this.slot
              }
            }}></div>
          </toast>
        )
      }
    })

    Vue.$vui = Vue.prototype.$vui = Vue.prototype.$vui || {}
    Vue.prototype.$vui.toast = {
      show (option) {
        Object.keys(Toast.props).forEach(function (key) {
          vm[key] = option[key] !== undefined ? option[key] : Toast.props[key].default
        })
        vm.slot = option.slot
        vm.$refs.toast.show()
      },
      hide () {
        list.forEach(function (item) {
          item.splice(0)
        })
      }
    }
  }
}
