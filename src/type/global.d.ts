declare module '*.vue' {
  import { VuiComponent } from '@/type/module'
  export default VuiComponent
}

declare module '*.png' {
  const image: string
  export default image
}
