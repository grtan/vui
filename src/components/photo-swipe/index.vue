<template>
  <!-- Root element of PhotoSwipe. Must have class pswp. -->
  <div class="pswp vui-photo-swipe" tabindex="-1" role="dialog" aria-hidden="true">
    <!-- Background of PhotoSwipe. 
         It's a separate element as animating opacity is faster than rgba(). -->
    <div class="pswp__bg"></div>
    <!-- Slides wrapper with overflow:hidden. -->
    <div class="pswp__scroll-wrap">
      <!-- Container that holds slides. 
            PhotoSwipe keeps only 3 of them in the DOM to save memory.
            Don't modify these 3 pswp__item elements, data is added later on. -->
      <div class="pswp__container">
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
      </div>
      <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
      <div class="pswp__ui pswp__ui--hidden">
        <div class="pswp__top-bar">
          <!--  Controls are self-explanatory. Order can be changed. -->
          <div class="pswp__counter"></div>
          <button class="pswp__button pswp__button--close" title="关闭"></button>
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
        <button class="pswp__button pswp__button--arrow--left" title="上一张"></button>
        <button class="pswp__button pswp__button--arrow--right" title="下一张"></button>
        <div class="pswp__caption">
          <div class="pswp__caption__center"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PhotoSwipe from 'photoswipe/dist/photoswipe';
import PhotoSwipeUI from 'photoswipe/dist/photoswipe-ui-default';

export default {
  name: 'vui-photo-swipe',
  props: {
    items: {
      type: Array,
      required: true
    },
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    list() {
      return this.items.map(item => {
        // 当有动画显示的时候，需要设置msrc缩略图，如果没有设置，默认使用src
        if (this.options.showAnimationDuration !== 0 && !item.msrc) {
          item.msrc = item.src;
        }
        return item;
      });
    }
  },
  methods: {
    openPhotoSwipe(index) {
      const item = this.list[index];
      const _this = this;
      if (!item.w || !item.h) {
        const img = new Image();
        img.onload = function() {
          item.w = this.width;
          item.h = this.height;
          _this.photoSwipeInit(index);
        };
        img.src = item.src;
      } else {
        this.photoSwipeInit(index);
      }
    },
    photoSwipeInit(index) {
      const _this = this;
      const options = Object.assign(
        {
          history: false,
          focus: false,
          tapToClose: true,
          arrowEl:false,
          index: index || 0
        },
        this.options
      );
      this.photoswipe = new PhotoSwipe(this.$el, PhotoSwipeUI, this.list, options);
      this.photoswipe.listen('gettingData', function(index, item) {
        if (!item.w || !item.h) {
          const img = new Image();
          img.onload = function() {
            item.w = this.width;
            item.h = this.height;
            _this.photoswipe.updateSize(true);
          };
          img.src = item.src;
        }
      });
      this.photoswipe.init();
      this.photoswipe.listen('close', () => {
        this.$emit('on-close');
      });
      this.photoswipe.listen('afterChange', () => {
        this.$emit('on-index-change', {
          currentIndex: this.photoswipe.getCurrentIndex()
        });
      });
    },
    getCurrentIndex() {
      if (this.photoswipe) {
        return this.photoswipe.getCurrentIndex();
      }
    },
    invalidateCurrItems() {
      this.photoswipe && this.photoswipe.invalidateCurrItems();
    },
    updateSize() {
      this.photoswipe && this.photoswipe.updateSize(true);
    },
    close() {
      this.photoswipe && this.photoswipe.close();
    },
    destroy() {
      this.photoswipe && this.photoswipe.destroy();
    },
    goTo(index) {
      this.photoswipe && this.photoswipe.goTo(index);
    },
    prev() {
      this.photoswipe && this.photoswipe.prev();
    },
    next() {
      this.photoswipe && this.photoswipe.next();
    }
  },
  mounted() {}
};
</script>

<style src="photoswipe/dist/photoswipe.css"></style>

