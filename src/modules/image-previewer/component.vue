<template>
  <!-- Root element of PhotoSwipe. Must have class pswp. -->
  <div class="vui-image-previewer pswp" tabindex="-1" role="dialog" aria-hidden="true">
    <!-- Background of PhotoSwipe. 
         It's a separate element as animating opacity is faster than rgba(). -->
    <div class="pswp__bg"></div>

    <!-- Slides wrapper with overflow:hidden. -->
    <div class="pswp__scroll-wrap">
      <!-- Container that holds slides. 
            PhotoSwipe keeps only 3 of them in the DOM to save memory.
            Don't modify these 3 pswp__item elements, data is added later on. -->
      <div ref="container" class="pswp__container" @click="onContainerClick">
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
      </div>

      <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
      <div class="pswp__ui pswp__ui--hidden">
        <div class="pswp__top-bar">
          <!--  Controls are self-explanatory. Order can be changed. -->

          <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

          <button class="pswp__button pswp__button--share" title="Share"></button>

          <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>

          <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

          <!-- Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR -->
          <!-- element will get class pswp__preloader--active when preloader is running -->
          <div class="pswp__preloader">
            <div class="pswp__preloader__icn">
              <div class="pswp__preloader__cut">
                <div class="pswp__preloader__donut"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
          <div class="pswp__share-tooltip"></div>
        </div>

        <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>

        <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>

        <div class="pswp__caption">
          <div class="pswp__caption__center"></div>
        </div>

        <!-- 自定义按钮 -->
        <div class="pswp__counter"></div>
        <div class="vui-image-previewer__download" @click="onSave"></div>
        <!-- 自定义渐变蒙层 -->
        <div class="vui-image-previewer__layer"></div>
        <div class="vui-image-previewer__layer vui-image-previewer__layer--bottom"></div>
      </div>
    </div>
    <!-- 加载出错区域 -->
    <div ref="error" class="vui-image-previewer__placeholder">
      <slot>
        <div class="vui-image-previewer__error">
          <vui-button class="vui-image-previewer__reload" corner="round">重新加载</vui-button>
        </div>
      </slot>
    </div>
    <!-- 利用overlayer创建历史记录 -->
    <vui-overlayer v-model="showOverlayer" class="vui-image-previewer__overlayer" :push-state="options.history">
    </vui-overlayer>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import PhotoSwipe from 'photoswipe'
import PhotoSwipeUI from 'photoswipe/dist/photoswipe-ui-default'
import VuiOverlayer from '../overlayer/component.vue'
import VuiButton from '../button/component.vue'
import { raf } from '../../utils/prefix'

@Component({
  name: 'VuiImagePreviewer',
  components: {
    VuiOverlayer,
    VuiButton
  }
})
export default class VComponent extends Vue {
  previewer?: PhotoSwipe<PhotoSwipe.Options>
  showOverlayer = false

  // 当前显示第几项，-1表示关闭状态
  @Prop({
    type: Number,
    default: -1
  })
  readonly value!: number

  // 项目列表
  @Prop({
    type: Array,
    required: true,
    validator(value) {
      return value.length > 0
    }
  })
  readonly list!: PhotoSwipe.Item[]

  // photoswipe配置项
  @Prop({
    type: Object,
    default: () => {
      return {}
    }
  })
  readonly options!: PhotoSwipe.Options

  // 获取对应缩略图元素
  @Prop({
    type: Function
  })
  readonly getThumbnail?: (index: number) => HTMLElement

  get items() {
    // 这里采用深拷贝，防止photoswipe修改item时修改到this.list
    const list = JSON.parse(JSON.stringify(this.list)) as this['list']

    list.forEach(item => {
      // 不设置msrc时，photoswipe会以灰色矩形区域替代
      if (!item.msrc) {
        item.msrc = item.src
      }

      // photoswipe必须要设置尺寸，否则报错
      if ([item.w, item.h].includes(undefined)) {
        item.w = 0
        item.h = 0
      }

      return item
    })

    return list
  }

  get opts() {
    return {
      pinchToClose: false,
      closeOnVerticalDrag: false,
      tapToClose: true,
      showHideOpacity: true,
      ...this.options,
      index: this.value,
      // 这里始终为false，避免photoswipe自己创建历史记录
      history: false,
      shareEl: false
    }
  }

  // 预览指定图片
  @Watch('opts.index')
  async show() {
    // dom还未挂载
    if (!this.$el) {
      return
    }

    if (this.opts.index < 0) {
      // 关闭预览
      if (this.previewer) {
        this.showOverlayer = false
      }

      return
    }

    // 已经打开了预览组件
    if (this.previewer) {
      // 切换item
      if (this.opts.index !== this.previewer.getCurrentIndex()) {
        this.previewer.goTo(this.opts.index)
      }

      return
    }

    // 如果提供了获取缩略图的方法，则提前获取当前预览图片的尺寸，以便打开动画能进行位移过渡
    if (this.getThumbnail && (!this.items[this.opts.index].w || !this.items[this.opts.index].h)) {
      await new Promise(resolve => {
        const img = new Image()

        img.onload = () => {
          this.items[this.opts.index].w = img.width
          this.items[this.opts.index].h = img.height
          resolve('')
        }
        img.onerror = () => {
          resolve('')
        }
        img.src = this.items[this.opts.index].src!
        setTimeout(() => {
          resolve('')
        }, 300)
      })
    }

    // 打开预览组件
    this.previewer = new PhotoSwipe(this.$el as HTMLElement, PhotoSwipeUI, JSON.parse(JSON.stringify(this.items)), {
      ...this.opts,
      errorMsg: (this.$refs.error as HTMLElement).innerHTML,
      getThumbBoundsFn: this.getThumbnail
        ? index => {
            // 获取缩略图元素
            const thumbnail = this.getThumbnail!(index)
            // get window scroll Y
            const pageYScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            // optionally get horizontal scroll
            const pageXScroll = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft
            // get position of element relative to viewport
            const rect = thumbnail.getBoundingClientRect()

            return {
              x: rect.left + pageXScroll,
              y: rect.top + pageYScroll,
              w: rect.width
            }
          }
        : undefined
    })
    // 未设置尺寸时加载图片后重新设置尺寸
    this.previewer.listen('gettingData', (index, item) => {
      /**
       * item.loadError为true时证明已经加载失败了，不能再尝试加载
       * 否则会再次触发onerror中的updateSize，导致无限循环
       */
      if ((!item.w || !item.h) && !item.loadError) {
        const img = new Image()

        img.onload = () => {
          item.w = img.width
          item.h = img.height

          // 这里是为了防止图片显示时出现从0尺寸开始放大的过渡效果
          if (this.previewer?.getCurrentIndex() === index) {
            this.previewer?.invalidateCurrItems()
          }

          /**
           * 这里会导致加载失败元素尺寸被设置成0
           * 所以在css中给失败元素宽高强制设置!important非0尺寸
           */
          this.previewer?.updateSize(true)
        }
        img.onerror = () => {
          if (this.previewer?.getCurrentIndex() === index) {
            this.previewer?.invalidateCurrItems()
          }

          this.previewer?.updateSize(true)
        }
        img.src = item.src!
      }
    })
    this.previewer.listen('afterChange', () => {
      this.$emit('input', this.previewer?.getCurrentIndex())
    })
    this.previewer.listen('destroy', () => {
      this.previewer = undefined
      this.showOverlayer = false
      this.$emit('input', -1)
    })
    this.showOverlayer = true
    // 在container元素监听pswpTap事件，framework在photoswipe init后才存在
    await this.$nextTick()
    this.previewer.framework.bind(this.$refs.container, 'pswpTap', this.onPswpTap)
  }

  // 当使用tapToClose时，移动端点击图片时不关闭预览组件
  onPswpTap(e: any) {
    // 非移动端，保持原样
    if (e.detail && e.detail.pointerType === 'mouse') {
      return
    }

    if (e.target.classList.contains('pswp__img')) {
      e.target.classList.remove('pswp__img')
      // 等photoswipe事件回调后、浏览器渲染前恢复pswp__img类
      raf(() => {
        e.target.classList.add('pswp__img')
      })
    }
  }

  // 更新图片列表
  @Watch('items')
  update() {
    if (!this.previewer) {
      return
    }

    // 重置所有数据，因为photoswipe会在item上添加保存内部状态的字段，所以这里必须采用深拷贝来完全重置数据
    this.previewer.items.splice(0, this.previewer.items.length, ...JSON.parse(JSON.stringify(this.items)))
    // sets a flag that slides should be updated
    this.previewer.invalidateCurrItems()
    // updates the content of slides
    this.previewer.updateSize(true)
  }

  @Watch('showOverlayer')
  onShowOverlayerChange() {
    if (!this.previewer) {
      return
    }

    if (this.showOverlayer) {
      this.previewer.init()
      return
    }

    this.previewer.close()
  }

  // 检测是否重新加载
  onContainerClick(event: Event) {
    let el = event.target as HTMLElement

    while (el !== event.currentTarget) {
      if (el.classList.contains('vui-image-previewer__reload')) {
        this.update()
        return
      }

      el = el.parentElement!
    }
  }

  onSave() {
    // TODO: 文件下载
  }

  async mounted() {
    // 将根dom节点移到body下，防止业务方样式干扰
    document.body.appendChild(this.$el)
    // 等子组件都挂载完成后再显示，否则errorMsg的html可能获取不全
    await this.$nextTick()
    await this.show()
  }

  beforeDestroy() {
    this.previewer && this.previewer.destroy()
  }
}
</script>
