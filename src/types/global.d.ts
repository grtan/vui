declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
declare module '*?inline' {
  const content: string
  export default content
}
declare module '*?external' {
  const content: string
  export default content
}
declare module '*?info' {
  const content: {
    src: string
    bytes: number
  }
  export default content
}
declare module '*?thumb' {
  const content: string
  export default content
}
declare module '*?thumb&inline' {
  const content: string
  export default content
}
declare module '@vivo/v-jsbridge'
declare module '@silvermine/videojs-quality-selector'

interface HTMLElement {
  _intersect?: {
    observer: IntersectionObserver
  }
  _appear?: {
    observer: IntersectionObserver
  }
  _disappear?: {
    init: boolean
    observer: IntersectionObserver
  }
  _scroll?: {
    handler: EventListenerOrEventListenerObject
  }
  _top?: {
    handler: EventListenerOrEventListenerObject
  }
  _bottom?: {
    handler: EventListenerOrEventListenerObject
  }
}

interface Window {
  mozRequestAnimationFrame: typeof requestAnimationFrame
  oRequestAnimationFrame: typeof requestAnimationFrame
  msRequestAnimationFrame: typeof requestAnimationFrame
  mozCancelAnimationFrame: typeof cancelAnimationFrame
  oCancelAnimationFrame: typeof cancelAnimationFrame
  msCancelAnimationFrame: typeof cancelAnimationFrame
}

// 获取重载函数的返回值类型
type OverloadReturnType<T> = T extends {
  (...args: any[]): infer R
  (...args: any[]): infer R
  (...args: any[]): infer R
  (...args: any[]): infer R
}
  ? R
  : T extends { (...args: any[]): infer R; (...args: any[]): infer R; (...args: any[]): infer R }
  ? R
  : T extends { (...args: any[]): infer R; (...args: any[]): infer R }
  ? R
  : T extends (...args: any[]) => infer R
  ? R
  : any
