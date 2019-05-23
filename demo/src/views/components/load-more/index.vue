<template>
  <div>
    <div>
      <p :class="$style.title" :style="{marginTop:'0'}">默认下拉加载</p>
      <load-more :class="$style['load-more']" @load="onDefaultPullLoad">
        <div :class="$style.content">
          <div v-for="(value,index) in defaultPullList" :key="index">列表项{{value}}</div>
        </div>
      </load-more>
    </div>
    <div>
      <p :class="$style.title">默认上划加载</p>
      <load-more :class="$style['load-more']" :pull="false" position="bottom" @load="onDefaultScrollLoad">
        <div :class="$style.content">
          <div v-for="(value,index) in defaultScrollList" :key="index">列表项{{value}}</div>
        </div>
      </load-more>
    </div>
    <div>
      <p :class="$style.title">自定义下拉加载</p>
      <load-more :class="$style['load-more']" @change="onChange" @load="onPullLoad">
        <div :class="$style.loading" slot="loading">{{pullText}}</div>
        <div :class="$style.content">
          <div v-for="(value,index) in pullList" :key="index">列表项{{value}}</div>
        </div>
      </load-more>
    </div>
    <div>
      <p :class="$style.title">自定义上划加载</p>
      <load-more :class="$style['load-more']" :pull="false" position="bottom" @appear="onAppear"
                 @load="onScrollLoad">
        <div :class="$style.loading" slot="loading">{{scrollText}}</div>
        <div :class="$style.content">
          <div v-for="(value,index) in scrollList" :key="index">列表项{{value}}</div>
        </div>
      </load-more>
    </div>
  </div>
</template>

<style module>
  .title {
    margin: 100px 0 20px;
    color: #333;
  }

  .load-more {
    padding: 5px;
    height: 700px;
    border: 1px solid;
  }

  .loading {
    color: #0a88f0;
    font-size: .4rem;
    line-height: 1rem;
    text-align: center;
  }

  .content div {
    color: #666;
    font-size: .5rem;
    line-height: 2;
    border-bottom: 1px solid #ddd;
  }
</style>

<script>
  import { LoadMore } from 'vui'

  export default {
    components: {
      LoadMore
    },
    data() {
      return {
        defaultPullHasMore: true,
        defaultPullList: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
        defaultScrollHasMore: true,
        defaultScrollList: (() => {
          const list = []

          for (let i = 0; i < 50; i++) {
            list.push(i)
          }

          return list
        })(),
        pullText: '下拉加载',
        pullHasMore: true,
        pullList: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
        scrollText: '正在加载',
        scrollHasMore: true,
        scrollList: (() => {
          const list = []

          for (let i = 0; i < 50; i++) {
            list.push(i)
          }

          return list
        })()
      }
    },
    methods: {
      onDefaultPullLoad(finish) {
        if (this.defaultPullHasMore) {
          setTimeout(() => {
            const length = this.defaultPullList.length

            for (let i = length; i < length + 10; i++) {
              this.defaultPullList.unshift(i)
            }

            this.defaultPullList.length > 50 && (this.defaultPullHasMore = false)
            finish('success')
          }, 2000)
        } else {
          setTimeout(() => {
            finish('nomore')
          }, 2000)
        }
      },
      onDefaultScrollLoad(finish) {
        if (this.defaultScrollHasMore) {
          setTimeout(() => {
            const length = this.defaultScrollList.length

            for (let i = length; i < length + 30; i++) {
              this.defaultScrollList.push(i)
            }

            this.defaultScrollList.length > 200 && (this.defaultScrollHasMore = false)
            finish('success')
          }, 2000)
        } else {
          setTimeout(() => {
            finish('nomore')
          }, 2000)
        }
      },
      onChange({touch, progress}) {
        if (touch) {
          if (progress < 100) {
            this.pullText = '下拉加载'
          } else {
            this.pullText = '松开加载'
          }
        }
      },
      onPullLoad(finish) {
        this.pullText = '正在加载...'

        if (this.pullHasMore) {
          setTimeout(() => {
            const length = this.pullList.length

            for (let i = length; i < length + 10; i++) {
              this.pullList.unshift(i)
            }

            this.pullList.length > 50 && (this.pullHasMore = false)
            this.pullText = '加载完成'
            setTimeout(() => {
              finish('success')
            }, 500)
          }, 2000)
        } else {
          setTimeout(() => {
            this.pullText = '没有更多内容了~'
            setTimeout(() => {
              finish('nomore')
            }, 500)
          }, 2000)
        }
      },
      onAppear() {
        this.scrollText = '正在加载...'
      },
      onScrollLoad(finish){
        if (this.scrollHasMore) {
          setTimeout(() => {
            const length = this.scrollList.length

            for (let i = length; i < length + 30; i++) {
              this.scrollList.push(i)
            }

            this.scrollList.length > 200 && (this.scrollHasMore = false)
            this.scrollText = '加载完成'
            finish('success')
          }, 2000)
        } else {
          setTimeout(() => {
            this.scrollText = '没有更多内容了~'
            finish('nomore')
          }, 2000)
        }
      }
    }
  }
</script>