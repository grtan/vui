import Dialog from '../../components/dialog/index.vue'

export default {
  install (Vue) {
    const list = []

    Dialog.mixins = [{
      created () {
        list.push(this)
      }
    }]
    Vue.$vui = Vue.prototype.$vui = Vue.prototype.$vui || {}
    Vue.prototype.$vui.dialog = {
      show (option) {
        new Vue({ // eslint-disable-line no-new
          components: {
            VuiDialog: Dialog
          },
          el: document.body.appendChild(document.createElement('div')),
          render () {
            return (
              <vui-dialog {...{
                'class': ['vui-dialog-plugin', option.className],
                attrs: {
                  appear: ''
                },
                props: {
                  preventClose: this.preventClose,
                  duration: this.duration,
                  close: this.close,
                  title: this.title,
                  btns: this.btns
                }
              }} vModel={this.show} vOn:btn-click={this.btnClick}>
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
            preventClose: (option && option.preventClose !== undefined) ? option.preventClose : Dialog.props.preventClose.default,
            duration: (option && option.duration !== undefined) ? option.duration : Dialog.props.duration.default,
            close: (option && option.close) || Dialog.props.close.default,
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
