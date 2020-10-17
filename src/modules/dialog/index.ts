import { Vue } from 'vue-property-decorator'
import Component from './component.vue'
import { dialog, alert, confirm } from './extend'

const Dialog = Component as typeof Component & {
  dialog: typeof dialog
  alert: typeof alert
  confirm: typeof confirm
}

Dialog.dialog = dialog
Dialog.alert = alert
Dialog.confirm = confirm
Dialog.install = function (vue: typeof Vue) {
  vue.component('VuiDialog', Dialog)
  vue.$vui = vue.prototype.$vui = vue.prototype.$vui ?? {}
  Object.assign(vue.prototype.$vui, {
    dialog,
    alert,
    confirm
  })
}

export default Dialog
