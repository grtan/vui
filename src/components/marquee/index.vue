<template>
  <div class="vui-marquee" :vui-direction="direction" :vui-play="play">
    <div class="vui-marquee-wrapper" :style="wrapperStyle" ref="wrapper">
      <div class="vui-marquee-content" :style="contentStyle" ref="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="less">
  @import "../../assets/style/base";

  @name: ~"@{lib-name}-marquee";
  @direction: ~"@{lib-name}-direction";
  @play: ~"@{lib-name}-play";
  @directions: left, right, up, down;

  .marquee(@direction) {
    .keyframe() when (@direction=left) {
      to {
        transform: translate3d(-50%, 0, 0);
      }
    }

    .keyframe() when (@direction=right) {
      from {
        transform: translate3d(-50%, 0, 0);
      }
    }

    .keyframe() when (@direction=up) {
      to {
        transform: translate3d(0, -50%, 0);
      }
    }

    .keyframe() when (@direction=down) {
      from {
        transform: translate3d(0, -50%, 0);
      }
    }

    @keyframes ~ "marquee-@{direction}" {
      .keyframe();
    }
  }

  each(@directions, {
    .marquee(@value);
  });

  .@{name} {
    display: flex;
    overflow: hidden;

    &[@{direction}=up],
    &[@{direction}=down] {
      flex-direction: column;

      .@{name}-wrapper {
        flex-direction: column;
      }
    }

    &-wrapper {
      display: flex;
      flex-shrink: 0;
      animation: linear infinite;
    }

    each(@directions, {
      &[@{play}][@{direction}=@{value}] {
        .@{name}-wrapper {
          animation-name: ~ "marquee-@{value}";
        }
      }
    });
  }
</style>

<script>
  export default {
    name: 'vui-marquee',
    props: {
      direction: {
        type: String,
        default: 'left',
        validator (value) {
          return ['up', 'down', 'left', 'right'].indexOf(value) !== -1
        }
      },
      duration: { // 播放一遍所需的时间
        type: Number,
        default: 10000
      },
      spacing: {  // 内容之间的间隙，相对容器的比例
        type: Number,
        default: 0.25
      }
    },
    data() {
      return {
        play: false,  // 是否滚动播放
        contentStyle: {}
      }
    },
    computed: {
      sizeProp() {
        return ['left', 'right'].indexOf(this.direction) !== -1 ? 'width' : 'height'
      },
      wrapperStyle() {
        return {
          animationDuration: `${this.duration}ms`
        }
      }
    },
    watch: {
      direction(value, oldValue) {
        // 滚动方向改变，如从水平改为垂直
        if ((['left', 'right'].indexOf(value) !== -1) !== (['left', 'right'].indexOf(oldValue) !== -1)) {
          this.check()
        }
      },
      duration: 'check',
      spacing: 'check'
    },
    methods: {
      check() { // 检查内容是否溢出
        this.$nextTick(function () { // 确保dom已更新
          const wrapper = this.$refs.wrapper
          const size = this.$el.getBoundingClientRect()[this.sizeProp]  // 根元素尺寸

            // 删除复制的节点
          ;[].slice.call(wrapper.children, 1).forEach(function (el) {
            el.remove()
          })
          this.contentStyle = {} // 去掉content的margin
          this.play = false // 重置位置
          this.$nextTick(function () {
            if (wrapper.getBoundingClientRect()[this.sizeProp] > size) {
              this.contentStyle = {
                [`margin${this.sizeProp === 'width' ? 'Right' : 'Bottom'}`]: `${this.spacing * size}px`
              }
              this.$nextTick(function () {
                wrapper.appendChild(this.$refs.content.cloneNode(true))
                this.play = true
              })
            }
          })
        })
      }
    },
    mounted() {
      this.check()
    }
  }
</script>