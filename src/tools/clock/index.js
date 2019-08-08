import Transit from '../transit/index'

export default class Clock {
  /**
   * @constructor
   * @param {number} [now] - 当前时间的unix时间戳，单位ms
   * @param {function} callback - 回调函数
   */
  constructor ({ now = Date.now(), callback } = {}) {
    const to = now + 100 * 365 * 24 * 3600000 // 正计时最大一百年
    let date

    this.transit = new Transit({
      from: now,
      to,
      duration: to - now,
      callback: (value) => {
        value = new Date(value)

        // 秒数变化时才执行回调
        if (!date || date.getSeconds() !== value.getSeconds()) {
          date = value
          callback(this.getResult(date))
        }
      }
    }).play()
  }

  getResult (date) {
    const year = date.getFullYear()
    // 当年第一天
    const first = new Date(year, 0, 1)
    // 第一天是那周的第几天(0-6)
    const day = first.getDay()
    const time = first.getTime()
    const week = Math.ceil((day + (date.getTime() - time) / (24 * 3600000)) / 7)

    return {
      year,
      month: date.getMonth() + 1,
      date: date.getDate(),
      week,
      day: date.getDay() || 7,
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds()
    }
  }

  destroy () {
    this.transit.pause()
  }
}
