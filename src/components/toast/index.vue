<script lang="js">
  import Cutover from '../cutover/index.vue'

  export default {
    name: 'vui-toast',
    components: {
      Cutover
    },
    props: {
      duration: {
        type: Number,
        default: 300
      },
      time: {
        type: Number,
        default: 2000
      },
      position: {
        type: String,
        default: 'center',
        validator (value) {
          return ['top', 'center', 'bottom'].indexOf(value) !== -1
        }
      },
      single: { // 是否同时只能显示一个toast
        type: Boolean,
        default: true
      },
      className: { // 自定义类名
        type: String,
        default: 'vui-toast-box'
      }
    },
    data () {
      return {
        id: 0,
        list: []
      }
    },
    render () {
      return (
          <div class="vui-toast">{
            this.list.map(item => (
                <cutover appear {...{
                  key: item.id,
                  props: {
                    duration: item.duration
                  }
                }}>
                  <div class={item.className} direction={item.position} vShow={item.show}>
                    {item.slot}
                  </div>
                </cutover>
            ))
          }</div>
      )
    },
    methods: {
      show () {
        this.$nextTick(function () { // 只有在nextTick中才能获取更新后的props
          if (!this.single || !this.list.length) {
            let item = {
              id: this.id++,
              slot: this.$slots.default,
              show: true,
              duration: this.duration,
              position: this.position,
              className: this.className
            }

            this.list.push(item)
            setTimeout(() => {
              item.show = false
              // 等退场过渡完成后再移除
              setTimeout(() => {
                this.list.splice(this.list.indexOf(item), 1)
              }, this.duration)
            }, this.time + this.duration)
          }
        })
      }
    }
  }
</script>