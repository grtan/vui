import videojs from 'video.js'
import Hammer from 'hammerjs'

export default class DoubleClickGesture extends videojs.getComponent('Component') {
  constructor(...args: ConstructorParameters<ReturnType<typeof videojs['getComponent']>>) {
    super(...args)

    const player = args[0]
    const hammerManager = new Hammer.Manager(player.$('video'))

    hammerManager.add(
      new Hammer.Tap({
        taps: 2
      })
    )

    hammerManager.on('tap', () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      player[player.paused() ? 'play' : 'pause']()
    })
  }
}
