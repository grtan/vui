export const namespace = 'vui'
export let size = 'regular'
export let zIndex = 99

export function update(config: { size?: 'big' | 'regular' | 'small' | 'mini'; zIndex?: number } = {}) {
  size = config.size ?? size
  zIndex = config.zIndex ?? zIndex
}
