import videojs from 'video.js'

class CurrentTimeDisplay extends videojs.getComponent('CurrentTimeDisplay') {
  updateContent() {
    let time

    if (this.player_.ended()) {
      time = this.player_.duration()
    } else {
      time = this.player_.currentTime()
    }

    ;(this as any).updateTextNode_(time)
  }
}

videojs.registerComponent('CurrentTimeDisplay', CurrentTimeDisplay)
