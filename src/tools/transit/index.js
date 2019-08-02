import { raf, caf } from '../prefix/index'
import { linear } from '../easing/index'

export default class Transit {
  constructor ({ from, to, duration = 300, easing = linear, callback } = {}) {
    this.from = from
    this.to = to
    this.duration = duration
    this.easing = easing
    this.callback = callback
    this.time = 0 // 当前过渡的时间点
    this.status = 'pause' // 过渡状态
    this.reverse = false // 是否倒放
  }

  next () {
    // 使用performance.now来获取时间更精确
    const now = performance.now()

    if (this.lastTime === undefined) {
      this.lastTime = now
    }

    if (!this.reverse) {
      // 正放
      this.time += now - this.lastTime
    } else {
      // 倒放
      this.time -= now - this.lastTime
    }

    // 记录上一次动画帧的时间
    this.lastTime = now

    if ((!this.reverse && this.time < this.duration) || (this.reverse && this.time > 0)) {
      this.id = raf(this.next.bind(this))
      this.callback(this.easing(this.time, this.from, this.to - this.from, this.duration), false)
    } else {
      this.time = !this.reverse ? this.duration : 0
      this.status = 'complete'
      this.stopTiming()
      this.callback(!this.reverse ? this.to : this.from, true)
    }
  }

  stopTiming () { // 停止计时
    this.lastTime = undefined
  }

  pause () {
    if (this.status === 'play') {
      this.status = 'pause'
      this.stopTiming()
      caf(this.id)
    }

    return this
  }

  play () {
    if (this.status === 'pause') {
      this.status = 'play'
      this.next()
    }

    return this
  }

  seek (progress) { // 进度定位
    this.time = this.duration * progress
    this.stopTiming()

    // 修改状态为暂停，以便可以调用play方法来继续过渡
    if (this.status === 'complete') {
      this.status = 'pause'
    }

    return this
  }

  invert () { // 颠倒播放方向
    this.reverse = !this.reverse

    if (this.status === 'complete') {
      this.status = 'pause'
    }

    return this
  }

  getInfo () {
    return {
      reverse: this.reverse,
      status: this.status
    }
  }
}
