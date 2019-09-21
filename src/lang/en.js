import { libName } from '../config'
import button from '../components/button/lang/en'
import dialog from '../components/dialog/lang/en'
import popupPicker from '../components/popup-picker/lang/en'

export default {
  en: {
    [libName]: {
      ...button,
      ...dialog,
      ...popupPicker
    }
  }
}
