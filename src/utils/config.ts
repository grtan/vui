export const namespace = 'vui'
export let size = 'regular'

export function update(config: { size?: 'big' | 'regular' | 'small' | 'mini' }) {
  if (config.size) {
    size = config.size
  }
}
