import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import VuiTransition from '../transition/component.vue'
import VuiIntersect from '../intersect/index'

@Component({
  name: 'VuiImage',
  inheritAttrs: false,
  components: {
    VuiTransition
  },
  directives: {
    VuiIntersect
  }
})
export default class VComponent extends Vue {
  // 当前加载状态
  status = 'loading'
  // 是否曝光过
  exposed = false
  // 当前是否被曝光
  currentExposed = false
  // 超时检测timeout id
  timeoutId!: ReturnType<typeof setTimeout>
  // 延时timeout id
  delayTimeoutId!: ReturnType<typeof setTimeout>

  // 要加载的图片的src
  @Prop({
    type: String,
    default: ''
  })
  readonly src!: string

  // loading效果图的src
  @Prop({
    type: String,
    default: ''
  })
  readonly loading!: string

  // 加载失败效果图的src
  @Prop({
    type: String,
    default: ''
  })
  readonly error!: string

  // 延迟多久反馈加载结果，单位 ms
  @Prop({
    type: Number,
    default: 0
  })
  readonly delay!: number

  // 超时时间，单位 ms
  @Prop({
    type: Number,
    default: Infinity
  })
  readonly timeout!: number

  // 是否懒加载
  @Prop({
    type: [Boolean, Object],
    default: false
  })
  readonly lazy!: boolean | NonNullable<ConstructorParameters<typeof IntersectionObserver>[1]>

  /**
   * 是否显示辅助加载图片的img元素
   * 图片加载过程结束后自动移除该辅助img元素
   */
  get showHelper() {
    return this.status === 'loading' && this.src && (!this.lazy || this.exposed)
  }

  // 每张图片开始加载的时间
  get startLoadingTime() {
    // 这里特意加上src，是为了src变化时也能更新开始加载的时间
    if (this.showHelper && this.src) {
      return performance.now()
    }

    return 0
  }

  /**
   * 配置了project时，在vue文件中无法使用tsx
   * https://github.com/typescript-eslint/typescript-eslint/issues/566#issuecomment-500447712
   * https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser#parseroptionsecmafeaturesjsx
   */
  render() {
    return (
      <div class="vui-image">
        <vui-transition
          class="vui-image__transition"
          {...{
            props: this.$attrs,
            // 只有懒加载时才需要绑定vui-intersect指令
            directives: this.lazy
              ? [
                  {
                    name: 'vui-intersect',
                    value: {
                      handler: this.onIntersect,
                      options: this.lazy === true ? undefined : this.lazy
                    }
                  }
                ]
              : []
          }}
        >
          {(() => {
            if (this.status === 'loading') {
              return (
                <div key="loading" class="vui-image__wrapper">
                  {this.$slots.loading ?? (this.loading && <img class="vui-image__loading" src={this.loading} />)}
                </div>
              )
            } else if (this.status === 'error') {
              return (
                <div key="error" class="vui-image__wrapper">
                  {this.$slots.error ?? (this.error && <img class="vui-image__error" src={this.error} />)}
                </div>
              )
            } else {
              return <img class="vui-image__content" src={this.src} />
            }
          })()}
        </vui-transition>
        {this.showHelper && (
          <img
            class="vui-image__helper"
            src={this.src}
            {...{
              on: {
                load: this.onLoad,
                error: this.onError
              }
            }}
          />
        )}
      </div>
    )
  }

  // 更新图片
  @Watch('src')
  onSrcChange() {
    clearTimeout(this.delayTimeoutId)
    this.status = 'loading'

    if (this.lazy) {
      this.exposed = this.currentExposed
    }
  }

  @Watch('startLoadingTime', {
    immediate: true
  })
  onStartLoadingTimeChange() {
    if (!this.startLoadingTime) {
      return
    }

    clearTimeout(this.timeoutId)
    this.$emit('loading')

    if (this.timeout === Infinity) {
      return
    }

    // 超时检测
    this.timeoutId = setTimeout(() => {
      // 加载已经结束
      if (this.status !== 'loading') {
        return
      }

      this.status = 'error'
      this.$emit('finished', 'timeout')
    }, this.timeout)
  }

  onLoad() {
    this.delayTimeoutId = setTimeout(() => {
      // 已经超时
      if (this.status !== 'loading') {
        return
      }

      this.status = 'success'
      this.$emit('finished', 'success')
    }, this.delay)
  }

  onError() {
    this.delayTimeoutId = setTimeout(() => {
      // 已经超时
      if (this.status !== 'loading') {
        return
      }

      this.status = 'error'
      this.$emit('finished', 'fail')
    }, this.delay)
  }

  onIntersect(entries: any, observer: any, isIntersecting: boolean) {
    if (isIntersecting) {
      this.exposed = true
    }

    /**
     * 当前是否为曝光的状态
     * 这里不同步设置this.expose，是为了防止图片还未加载完时把img元素remove，从而中断图片加载
     */
    this.currentExposed = isIntersecting
  }

  beforeDestroy() {
    clearTimeout(this.timeoutId)
    clearTimeout(this.delayTimeoutId)
  }
}
