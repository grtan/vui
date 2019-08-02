import Transit from '../transit/index'

export default class Timer {
  /**
   * @constructor
   * @param {number} [from] - 计时的起始时间，单位s
   * @param {boolean} [countdown] - 是否倒计时
   * @param {string} [format] - 时间格式
   * @param {function} callback - 回调函数
   */
  constructor ({ from = 0, countdown = false, format = 'dd HH:mm:ss', callback } = {}) {
    const to = countdown ? 0 : from + 100 * 365 * 24 * 3600 // 正计时最大一百年
    let time

    if (!/(?=.*[dHms])^(d{1,2}(\s(?=[Hms])|$))?(H{1,2}(:(?=[ms])|$))?(m{1,2}(:(?=s)|$))?(s{1,2}$)?$/.test(format)) {
      throw new Error('format格式不正确')
    }

    this.parseFormat(format)
    this.transit = new Transit({
      from,
      to,
      duration: Math.abs(to - from) * 1000,
      callback: (value, complete) => {
        value = countdown ? Math.ceil(value) : Math.floor(value)

        // 秒数变化时才执行回调
        if (value !== time) {
          time = value
          callback(this.getResult(time), complete)
        }
      }
    })
  }

  parseFormat (format) {
    format.replace(/(d+)|(H+)|(m+)|(s+)/g, ($0, $1, $2, $3, $4) => {
      $1 && (this.dayFormat = $1)
      $2 && (this.hourFormat = $2)
      $3 && (this.minuteFormat = $3)
      $4 && (this.secondFormat = $4)
    })
  }

  getResult (second) {
    const result = {}

    if (this.dayFormat) {
      const day = parseInt(second / (24 * 3600))

      second %= (24 * 3600)
      result.day = ((this.dayFormat.length > 1 && day < 10) ? '0' : '') + day
    }

    if (this.hourFormat) {
      const hour = parseInt(second / 3600)

      second %= 3600
      result.hour = ((this.hourFormat.length > 1 && hour < 10) ? '0' : '') + hour
    }

    if (this.minuteFormat) {
      const minute = parseInt(second / 60)

      second %= 60
      result.minute = ((this.minuteFormat.length > 1 && minute < 10) ? '0' : '') + minute
    }

    if (this.secondFormat) {
      result.second = ((this.secondFormat.length > 1 && second < 10) ? '0' : '') + second
    }

    return result
  }

  play () {
    this.transit.play()

    return this
  }

  pause () {
    this.transit.pause()

    return this
  }
}
