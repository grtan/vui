import { libName } from '../config'
import button from '../components/button/lang/zh-CN'
import dialog from '../components/dialog/lang/zh-CN'
import popupPicker from '../components/popup-picker/lang/zh-CN'

export default {
  'zh-CN': {
    [libName]: {
      ...button,
      ...dialog,
      popupPicker
    }
  }
}
