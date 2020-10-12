declare module '*.vue' {
  import { VuiComponent } from '@/types/module'
  export default VuiComponent
}

declare module '*.png' {
  const image: string
  export default image
}
