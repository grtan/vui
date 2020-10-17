interface VNodeDirective {
  name: string
  value?: any
  oldValue?: any
  expression?: any
  arg?: string
  oldArg?: string
  modifiers?: { [key: string]: boolean }
}

type ObserveHandler = (
  entries?: IntersectionObserverEntry[],
  observer?: IntersectionObserver,
  isIntersecting?: boolean
) => void

interface ObserveVNodeDirective extends Omit<VNodeDirective, 'modifiers'> {
  value?: ObserveHandler | { handler: ObserveHandler; options?: IntersectionObserverInit }
  modifiers?: {
    once?: boolean
  }
}

export default ObserveVNodeDirective
