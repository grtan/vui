declare module '*.vue' {
  import { VuiComponent } from '@/types/module'
  export default VuiComponent
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
