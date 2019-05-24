# load-more 加载更多

> load-more是一个加载更多组件，支持拉动加载和滚动加载。

## 使用方法

默认的下拉加载效果

```
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

  .loading .icon {
    display: inline-block;
    vertical-align: middle;
    margin-right: .2rem;
    width: .7rem;
    height: .7rem;
    background: center no-repeat url(./loading.svg);
    background-size: contain;
  }

  .loading .text {
    vertical-align: middle;
    color: #d37123;
    font-size: .5rem;
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
        defaultPullList: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
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
            finish({
              status: 'success'
            })
          }, 2000)
        } else {
          setTimeout(() => {
            finish({
              status: 'nomore'
            })
          }, 2000)
        }
      }
    }
  }
</script>
```

默认的上滑加载效果

```
<template>
  <div>
    <div>
      <p :class="$style.title">默认上划加载</p>
      <load-more :class="$style['load-more']" :pull="false" position="bottom" @load="onDefaultScrollLoad">
        <div :class="$style.content">
          <div v-for="(value,index) in defaultScrollList" :key="index">列表项{{value}}</div>
        </div>
      </load-more>
    </div>
  </div>
</template>

<script>
  import { LoadMore } from 'vui'

  export default {
    components: {
      LoadMore
    },
    data() {
      return {
        defaultScrollHasMore: true,
        defaultScrollList: (() => {
          const list = []

          for (let i = 0; i < 50; i++) {
            list.push(i)
          }

          return list
        })()
      }
    },
    methods: {
      onDefaultScrollLoad(finish) {
        if (this.defaultScrollHasMore) {
          setTimeout(() => {
            const length = this.defaultScrollList.length

            for (let i = length; i < length + 30; i++) {
              this.defaultScrollList.push(i)
            }

            this.defaultScrollList.length > 200 && (this.defaultScrollHasMore = false)
            finish({
              status: 'success'
            })
          }, 2000)
        } else {
          setTimeout(() => {
            finish({
              status: 'nomore',
              fold: false
            })
          }, 2000)
        }
      }
    }
  }
</script>
```

自定义的下拉加载效果

```
<template>
  <div>
    <div>
      <p :class="$style.title">自定义下拉加载</p>
      <load-more :class="$style['load-more']" @change="onChange" @load="onPullLoad">
        <div :class="$style.loading" slot="loading">{{pullText}}</div>
        <div :class="$style.content">
          <div v-for="(value,index) in pullList" :key="index">列表项{{value}}</div>
        </div>
      </load-more>
    </div>
  </div>
</template>

<script>
  import { LoadMore } from 'vui'

  export default {
    components: {
      LoadMore
    },
    data() {
      return {
        pullText: '下拉加载',
        pullHasMore: true,
        pullList: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
      }
    },
    methods: {
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
              finish({
                status: 'success'
              })
            }, 500)
          }, 2000)
        } else {
          setTimeout(() => {
            this.pullText = '没有更多内容了~'
            setTimeout(() => {
              finish({
                status: 'nomore'
              })
            }, 500)
          }, 2000)
        }
      }
    }
  }
</script>
```

自定义上滑加载效果

```
<template>
  <div>
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

<script>
  import { LoadMore } from 'vui'

  export default {
    components: {
      LoadMore
    },
    data() {
      return {
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
            finish({
              status: 'success'
            })
          }, 2000)
        } else {
          setTimeout(() => {
            this.scrollText = '没有更多内容了~'
            finish({
              status: 'nomore'
            })
          }, 2000)
        }
      }
    }
  }
</script>
```

## 属性

名称|类型|必填|默认值|描述
:-:|:-:|:-:|:-:|:-:
position|`String`|`N`|`top`|loading元素所在的位置，支持`top`,`bottom`,`left`,`right`。比如`pull`为`true`且`position`为`top`表示下拉加载，`pull`为`false`且`position`为`bottom`表示滚动到底部加载
pull|`Boolean`|`N`|`true`|是pull（拉动）加载还是scroll（滚动）加载，true表示pull加载
pullThreshold|`Number`|`N`|`1`|pull加载时，触发加载动作的拉动距离（相对于loading元素区域尺寸的比例，比如`position`为`top`或者`bottom`表示相对于loading区域高度的比例），scroll模式无效。
scrollThreshold|`Number`|`N`|`0`|scroll加载时，触发加载动作的阈值（同`pullThreshold`一致，也是相对于loading元素区域尺寸的比例。比如`position`为`bottom`时，表示滚动到距离底部多少距离才触发加载事件），pull模式无效
angle|`Number`|`N`|`45`|pull或者scroll时有效的角度，比如`position`为`top`或者`bottom`，`angle`为30，则表示手指初始滑动的方向与垂直方向的夹角要<=30度，否则无法pull或者scroll
pullLoadingBackground|`String`|`N`|`#FF8A00`|pull模式下，默认loading图的背景色，如果使用自定义loading效果，无需设置
successColor|`String`|`N`|`#FF8A00`|加载成功时，默认提示文本的颜色，如果使用自定义loading效果，无需设置
successBackground|`String`|`N`|`#FFF6EC`|加载成功时，loading区域的背景颜色，如果使用自定义loading效果，无需设置
failColor|`String`|`N`|`#AAA`|加载失败或者无更多数据时，默认提示文本的颜色，如果使用自定义loading效果，无需设置
failBackground|`String`|`N`|`#F6F7F8`|加载失败或者无更多数据时，loading区域的背景颜色，如果使用自定义loading效果，无需设置

## 插槽

名称|必填|说明
:-:|:-:|:-:
默认|`Y`|内容区域
loading|`N`|loading元素区域

## 事件

名称|参数|说明
:-:|:-:|:-:
change|(`{touch,progress}`)|pull模式才有效，当拉动的距离变化时触发，`touch`表示手指是否触摸（`false`表示已松开），`progress`表示拉动的距离相对于`pullThreshold`的百分比
release|(`progress`)|pull模式才有效，手指松开时触发，`progress`同`change`事件
appear|`-`|scroll模式才有效，当loading元素出现时触发
load|(`finish(param)`)|触发加载动作时触发，**当数据更新完成后一定要执行`finish`回调函数，否则loading元素不会隐藏，且无法再次触发加载。回调函数接受一个必填的对象参数param**

### param属性

名称|类型|必填|默认值|描述
:-:|:-:|:-:|:-:|:-:
status|`String`|`Y`|`-`|加载的状态，`success`表示加载成功，`fail`表示失败，`nomore`表示没有更多数据
text|`String`|`N`|`success`为`加载成功`，`fail`为`加载失败`，`nomore`为`没有更多数据了`|提示文本
fold|`Boolean`|`N`|`true`|加载结束后是否隐藏loading元素区域。如果没有更多数据时想一直显示提示文本，就将`fold`设为`false`

## 更新日志

* v1.0.0 发布