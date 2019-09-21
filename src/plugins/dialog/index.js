import { libName } from '../../config'
import Dialog from '../../components/dialog/index.vue'

export default {
  install (Vue) {
    const list = []

    Dialog.mixins = Dialog.mixins || []
    Dialog.mixins.push({
      created () {
        list.push(this)
      }
    })
    Vue.$vui = Vue.prototype.$vui = Vue.prototype.$vui || {}
    Vue.prototype.$vui.dialog = {
      show (option) {
        new Vue({ // eslint-disable-line no-new
          name: `${libName}-dialog-plugin`,
          components: {
            VuiDialog: Dialog
          },
          el: document.body.appendChild(document.createElement('div')),
          render () {
            return (
              <vui-dialog
                class={[this.$options.name, option.className]}
                vModel={this.show}
                duration={this.duration}
                title={this.title}
                btns={this.btns}
                prevent-close={this.preventClose}
                appear
                {...{
                  on: {
                    'btn-click': this.btnClick
                  }
                }}
              >
                <div {...{
                  domProps: {
                    innerHTML: this.slot
                  }
                }} />
              </vui-dialog>
            )
          },
          data: {
            show: true,
            slot: (option && option.slot) || '',
            preventClose: (option && option.preventClose !== undefined) ? option.preventClose : false,
            duration: (option && option.duration !== undefined) ? option.duration : Dialog.props.duration.default,
            title: (option && option.title) || Dialog.props.title.default,
            btns: (option && option.btns) || Dialog.props.btns.default()
          },
          watch: {
            show (value) {
              !value && setTimeout(() => {
                this.$destroy()
              }, this.duration)
            }
          },
          methods: {
            btnClick (type) {
              option && typeof option.callback === 'function' ? option.callback(type, this.destroy) : this.destroy()
            },
            destroy () {
              this.show = false
            }
          },
          destroyed () {
            this.$el.parentElement.removeChild(this.$el)
          }
        })
      },
      hide () {
        list.forEach(function (vm) {
          vm.$emit('input', false)
        })
      }
    }
  }
}
