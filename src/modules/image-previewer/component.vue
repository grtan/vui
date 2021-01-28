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
      <div class="pswp__container" @click="onContainerClick">
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
      </div>
    </div>
    <!-- 加载出错区域 -->
    <div ref="error" class="vui-image-previewer__placeholder">
      <slot>
        <div class="vui-image-previewer__error">
          <vui-button class="vui-image-previewer__reload">重新加载</vui-button>
        </div>
      </slot>
    </div>
    <!-- 利用overlayer创建历史记录 -->
    <vui-overlayer v-model="showOverlayer" class="vui-image-previewer__overlayer"> </vui-overlayer>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import PhotoSwipe from 'photoswipe'
import PhotoSwipeUI from 'photoswipe/dist/photoswipe-ui-default'
import VuiOverlayer from '../overlayer/component.vue'
import VuiButton from '../button/component.vue'

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
      showHideOpacity: true,
      ...this.options,
      index: this.value,
      history: false,
      shareEl: false
    }
  }

  // 预览指定图片
  @Watch('opts.index')
  show() {
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

    if (this.previewer) {
      // 切换item
      if (this.opts.index !== this.previewer.getCurrentIndex()) {
        this.previewer.goTo(this.opts.index)
      }

      return
    }

    this.previewer = new PhotoSwipe(this.$el as HTMLElement, PhotoSwipeUI, JSON.parse(JSON.stringify(this.items)), {
      ...this.opts,
      errorMsg: (this.$refs.error as HTMLElement).innerHTML
    })
    // 未设置尺寸时加载图片后重新设置尺寸
    this.previewer.listen('gettingData', (index, item) => {
      if (!item.w || !item.h) {
        const img = new Image()

        img.onload = () => {
          item.w = img.width
          item.h = img.height

          if (this.previewer?.getCurrentIndex() === index) {
            this.previewer?.invalidateCurrItems()
          }

          /**
           * 这里会导致加载失败元素尺寸被设置成0
           * 所以在css中给失败元素宽高强制设置!important非0尺寸
           */
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
      return this.previewer.init()
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
    await this.$nextTick()
    this.show()
  }

  beforeDestroy() {
    this.previewer && this.previewer.destroy()
  }
}
</script>
