import { libName } from '../../config'

export default {
  beforeCreate () {
    const name = this.$options.name.replace(`${libName}-`, '')

    if (this.$i18n) {
      const $t = this.$t

      this.$t = (path, ...rest) => {
        path = `${libName}.${name}.${path}`
        return $t.call(this, path, ...rest)
      }

      return
    }

    this.$t = (path) => {
      let text = this.message
      let prop

      path = `${name}.${path}`.split('.')

      while ((prop = path.shift())) {
        text = text[prop]
      }

      return text
    }
  }
}
