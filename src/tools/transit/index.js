import { raf, caf, afInterval } from '../prefix/index'
import { linear } from '../easing/index'

export default function (from, to, callback, duration = 300, easing = linear) {
  let id
  let time = 0
  const next = function () {
    if (time < duration) {
      callback(easing(time, from, to - from, duration))
      time++
      id = raf(next)
    } else {
      callback(to, true)
    }
  }

  duration = Math.floor(duration / afInterval)

  return {
    pause () {
      caf(id)
    },
    play: next
  }
}
