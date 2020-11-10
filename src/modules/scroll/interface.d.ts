interface VNodeDirective {
  name: string
  value?: any
  oldValue?: any
  expression?: any
  arg?: string
  oldArg?: string
  modifiers?: { [key: string]: boolean }
}
export interface ScrollVNodeDirective extends Omit<VNodeDirective, 'modifiers'> {
  value?: Function
  modifiers?: {
    once?: boolean
  }
}
