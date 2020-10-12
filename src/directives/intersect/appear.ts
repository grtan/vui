import ObserveVNodeDirective from './interface'

function unbind(el: HTMLElement) {
  if (!el._appear) return

  el._appear.observer.unobserve(el)
  delete el._appear
}

function inserted(el: HTMLElement, binding: ObserveVNodeDirective) {
  const modifiers = binding.modifiers ?? {}
  const value = binding.value
  const { handler, options } = typeof value === 'object' ? value : { handler: value, options: {} }
  const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
    if (!el._appear) return

    const isIntersecting = Boolean(entries.find(entry => entry.isIntersecting))
    if (handler && isIntersecting) {
      handler() // 判断 isIntersecting 的值，可见时才调用处理函数
      if (modifiers.once) unbind(el) // 判断 isIntersecting 的值，可见时执行一次后才取消监听
    }
  }, options)

  el._appear = { observer }

  observer.observe(el)
}

export const appear = {
  inserted,
  unbind
}
