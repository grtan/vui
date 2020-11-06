import { Vue } from 'vue-property-decorator'
import VuiDialog from './component.vue'
import VuiButton from '../button/component.vue'

export function dialog(option: {
  className?: string
  title?: string
  content: string
  allowHtml?: boolean
  showClose?: boolean
  showCancelButton?: boolean
  showConfirmButton?: boolean
  cancelButtonText?: string
  confirmButtonText?: string
  pushState?: boolean
  closeOnClickOverlayer?: boolean
  beforeClose?: (action: 'other' | 'cancel' | 'confirm', close: (close?: boolean) => void) => void
}) {
  const options = Object.assign(
    {
      allowHtml: false,
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: '取消',
      confirmButtonText: '确定',
      beforeClose(action: 'other' | 'cancel' | 'confirm', close: Function) {
        close()
      }
    },
    option
  )

  const Component = Vue.extend({
    name: 'VuiDialogPlugin',
    components: {
      VuiDialog,
      VuiButton
    },
    render() {
      return (
        <vui-dialog
          vModel={this.show}
          appear={true}
          class={options.className}
          showClose={options.showClose}
          pushState={options.pushState}
          closeOnClickOverlayer={options.closeOnClickOverlayer}
          beforeClose={this.beforeClose}
        >
          {options.title ? (
            <template slot="header">
              {options.allowHtml ? <div domPropsInnerHTML={options.title}></div> : options.title}
            </template>
          ) : null}
          <template slot="default">
            {options.allowHtml ? <div domPropsInnerHTML={options.content}></div> : options.content}
          </template>
          {options.showCancelButton || options.showConfirmButton ? (
            <template slot="footer">
              {options.showCancelButton ? (
                <vui-button
                  hue="primary"
                  corner="round"
                  size="big"
                  {...{
                    on: {
                      click: () => this.onButtonClick('cancel')
                    }
                  }}
                >
                  {options.cancelButtonText}
                </vui-button>
              ) : null}
              {options.showConfirmButton ? (
                <vui-button
                  type="gradient"
                  hue="primary"
                  corner="round"
                  size="big"
                  {...{
                    on: {
                      click: () => this.onButtonClick('confirm')
                    }
                  }}
                >
                  {options.confirmButtonText}
                </vui-button>
              ) : null}
            </template>
          ) : null}
        </vui-dialog>
      )
    },
    data() {
      const data: {
        show: boolean
        action: 'other' | 'cancel' | 'confirm'
      } = {
        show: true,
        action: 'other'
      }

      return data
    },
    methods: {
      onButtonClick(action: 'cancel' | 'confirm') {
        this.action = action
        this.show = false
      },
      beforeClose(callback: Function) {
        options.beforeClose(this.action, (close = true) => {
          callback(close)

          // 关闭时销毁组件
          if (close) {
            setTimeout(() => {
              this.$destroy()
            }, 500)
          }
        })
        this.action = 'other'
      }
    }
  })
  const vm = new Component()

  vm.$mount(document.body.appendChild(document.createElement('div')))

  return () => {
    vm.show = false
  }
}

export function alert(option: {
  className?: string
  title?: string
  content: string
  allowHtml?: boolean
  showClose?: boolean
  confirmButtonText?: string
  pushState?: boolean
  closeOnClickOverlayer?: boolean
  beforeClose?: (action: 'other' | 'cancel' | 'confirm', close: (close?: boolean) => void) => void
}) {
  return dialog({
    ...option,
    showCancelButton: false,
    showConfirmButton: true
  })
}

export function confirm(option: {
  className?: string
  title?: string
  content: string
  allowHtml?: boolean
  showClose?: boolean
  cancelButtonText?: string
  confirmButtonText?: string
  pushState?: boolean
  closeOnClickOverlayer?: boolean
  beforeClose?: (action: 'other' | 'cancel' | 'confirm', close: (close?: boolean) => void) => void
}) {
  return dialog({
    ...option,
    showCancelButton: true,
    showConfirmButton: true
  })
}
