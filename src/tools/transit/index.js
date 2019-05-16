import { raf, caf, afInterval } from '../prefix/index'
import { linear } from '../easing/index'

export default function (from, to, callback, duration = 300, easing = linear) {
  let id
  let time = 0
  let reverse // 反向
  const afCount = Math.round(duration / afInterval)
  const next = function () {
    if (!reverse && time < afCount || reverse && time) {
      callback(easing(time, from, to - from, afCount), false)
      !reverse ? time++ : time--
      id = raf(next)
    } else {
      callback(!reverse ? to : from, true)
    }
  }
  const transit = {
    pause () {
      caf(id)

      return transit
    },
    play () {
      next()

      return transit
    },
    seek (progress) {  // 定位
      time = Math.round(afCount * progress)

      return transit
    },
    invert () {  // 颠倒播放方向
      reverse = !reverse

      return transit
    },
    isReverse () { // 是否反向
      return reverse
    }
  }

  return transit
}
