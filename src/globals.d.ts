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
