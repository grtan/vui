import { update } from '@/utils/store'

export default function (options: { type?: 'mobile' | 'pc' } & Parameters<typeof update>[0]) {
  update(options)

  if (options.type === 'pc') {
    document.documentElement.classList.add('vuipc')
  } else {
    document.documentElement.classList.remove('vuipc')
  }
}
