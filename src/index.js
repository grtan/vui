// 工具
export { default as addStyle } from './tools/add-style/index'
export { default as ajax } from './tools/ajax/index'
export {
  linear,
  sineEaseIn,
  sineEaseOut,
  sineEaseInOut,
  quadEaseIn,
  quadEaseOut,
  quadEaseInOut,
  cubicEaseIn,
  cubicEaseOut,
  cubicEaseInOut,
  quartEaseIn,
  quartEaseOut,
  quartEaseInOut,
  quintEaseIn,
  quintEaseOut,
  quintEaseInOut,
  expoEaseIn,
  expoEaseOut,
  expoEaseInOut,
  circEaseIn,
  circEaseOut,
  circEaseInOut,
  backEaseIn,
  backEaseOut,
  backEaseInOut,
  elasticEaseIn,
  elasticEaseOut,
  elasticEaseInOut,
  bounceEaseIn,
  bounceEaseOut,
  bounceEaseInOut
} from './tools/easing/index'
export { prefixed, raf, caf } from './tools/prefix/index'
export { default as setSkin } from './tools/set-skin/index'
export { default as setType } from './tools/set-type/index'
export { default as transit } from './tools/transit/index'

// 组件
// 基础
export { default as Button } from './components/button/index.vue'
export { default as Icon } from './components/icon/index.vue'
// 导航
export { default as Navbar } from './components/navbar/index.vue'
export { default as Tab } from './components/tab/index.vue'
export { default as TabItem } from './components/tab/item.vue'
export { default as Pagination } from './components/pagination/index.vue'
// 反馈
export { default as Toast } from './components/toast/index.vue'
export { default as Dialog } from './components/dialog/index.vue'
export { default as Loading } from './components/loading/index.vue'
export { default as Layer } from './components/layer/index.vue'
export { default as Popup } from './components/popup/index.vue'
// 数据输入
export { default as Picker } from './components/picker/index.vue'
export { default as PopupPicker } from './components/popup-picker/index.vue'
export { default as Switch } from './components/switch/index.vue'
export { default as CityPicker } from './components/city-picker/index.vue'
// 数据展示
export { default as LoadMore } from './components/load-more/index.vue'
export { default as Swiper } from './components/swiper/index.vue'
export { default as SwiperItem } from './components/swiper/item.vue'
export { default as Marquee } from './components/marquee/index.vue'
export { default as PhotoSwipe } from './components/photo-swipe/index.vue'
// 过渡
export { default as Cutover } from './components/cutover/index.vue'
// 其他
export { default as Cache } from './components/cache/index.vue'
export { default as Timer } from './components/timer/index.vue'
// export { default as Upload } from './components/upload/index.vue'

// 插件
export { default as PDialog } from './plugins/dialog/index'
export { default as PToast } from './plugins/toast/index'
