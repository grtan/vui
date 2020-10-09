import ObserveVNodeDirective from './interface'

function unbind(el: HTMLElement) {
  if (!el._disappear) return

  el._disappear.observer.unobserve(el)
  delete el._disappear
}

function inserted(el: HTMLElement, binding: ObserveVNodeDirective) {
  const modifiers = binding.modifiers ?? {}
  const value = binding.value
  const { handler, options } = typeof value === 'object' ? value : { handler: value, options: {} }
  const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
    const isIntersecting = Boolean(entries.find(entry => entry.isIntersecting))
    if (!el._disappear) return

    if (handler && el._disappear.init) !isIntersecting && handler()

    if (el._disappear.init && modifiers.once) !isIntersecting && unbind(el)
    else el._disappear.init = true
  }, options)

  el._disappear = { init: false, observer }

  observer.observe(el)
}

export const disappear = {
  inserted,
  unbind
}
