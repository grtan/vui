import { VuiComponent } from '@/types/module'
import Component from './component.vue'
import { dialog, alert, confirm } from './extend'
import { extendVue } from '@/utils/extend'

const Dialog = Component as typeof Component &
  typeof VuiComponent & {
    dialog: typeof dialog
    alert: typeof alert
    confirm: typeof confirm
  }

Dialog.dialog = dialog
Dialog.alert = alert
Dialog.confirm = confirm
Dialog.install = function (Vue) {
  Vue.component('VuiDialog', Dialog)
  extendVue('dialog', dialog)
  extendVue('alert', alert)
  extendVue('confirm', confirm)
}

export default Dialog
