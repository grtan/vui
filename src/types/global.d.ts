declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

interface HTMLElement {
  _intersect?: {
    init: boolean
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
  mozRequestAnimationFrame: (callback: FrameRequestCallback) => number
  oRequestAnimationFrame: (callback: FrameRequestCallback) => number
  msRequestAnimationFrame: (callback: FrameRequestCallback) => number
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
