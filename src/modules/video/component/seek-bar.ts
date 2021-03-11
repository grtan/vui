import videojs from 'video.js'

class SeekBar extends videojs.getComponent('SeekBar') {
  handleMouseDown(event) {
    if (!videojs.dom.isSingleLeftClick(event)) {
      return
    }

    event.stopPropagation()
    // this.player_.scrubbing(true);
    this.videoWasPlaying = !this.player_.paused()
    super.handleMouseDown(event)
  }

  handleMouseMove() {
    console.log(222)
    super.handleMouseMove(...arguments)
    ;(this as any).update()
    // this.player_.trigger({ type: 'timeupdate', target: this, manuallyTriggered: true })
  }

  getCurrentTime_() {
    return this.player_.currentTime()
  }
}

videojs.registerComponent('SeekBar', SeekBar)

// console.log('yyy')

// const SeekBar = videojs.getComponent('SeekBar')
// const oldHandleMouseMove = SeekBar.prototype.handleMouseMove

// Object.assign(SeekBar.prototype, {
//   handleMouseMove() {
//     console.log(222)
//     oldHandleMouseMove.apply(this, arguments)
//     this.update()
//   },
//   getCurrentTime_() {
//     return this.player_.currentTime()
//   }
// })
