import 'video.js'

declare module 'video.js' {
  namespace videojs {
    namespace Tech {
      interface SourceObject {
        label?: string
        size?: number
        selected?: boolean
      }
    }
  }

  interface VideoJsPlayer {
    hlsQualitySelector: () => any
  }
}
