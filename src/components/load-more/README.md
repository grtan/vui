# load-more 加载更多

> load-more是一个加载更多组件，支持拉动加载和滚动加载。

## 使用方法

```
<template>
    <div>
        上划加载
        <load-more class="load-more" :pull="false" :duration="duration" direction="top"
                   @appear="appear" @load="load">
            <div slot="loading" class="loading" :style="loadingStyle">
                <span class="icon" v-show="['init','loading'].includes(status)"></span>
                <span class="text">{{text}}</span>
            </div>
            <div class="content">
                <div v-for="(value,index) in list" :key="index">{{value}}</div>
            </div>
        </load-more>
    </div>
</template>

<style>
    .load-more {
        height: 400px;
        border: 1px solid;
    }

    .loading {
        font-size: 0;
        line-height: 1rem;
        text-align: center;
    }

    .loading .icon {
        display: inline-block;
        vertical-align: middle;
        margin-right: .2rem;
        width: .7rem;
        height: .7rem;
        background: center no-repeat url(./loading.gif);
        background-size: contain;
    }

    .loading .text {
        vertical-align: middle;
        color: #d37123;
        font-size: .5rem;
    }

    .content {
        background: grey;
    }
</style>

<script>
  import {LoadMore} from 'vui'

  export default {
    components: {
      LoadMore
    },
    data() {
      return {
        duration: 400,
        text: '正在加载',
        status: 'init', // 状态，包含init、loading、complete三种
        work: true,
        list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
      }
    },
    computed: {
      loadingStyle() {
        return {
          transitionDuration: `${this.status === 'init' ? this.duration : 0}ms`
        }
      }
    },
    methods: {
      appear() { // 手指松开
        this.status = 'init'
        this.text = '正在加载'
      },
      load(callback){
        if (this.work) {
          this.status = 'loading'
          setTimeout(function () {
            const length = this.list.length

            this.status = 'complete'
            this.text = '加载完成'
            this.list.push(length + 1, length + 2, length + 3)
            this.list.push(length + 1, length + 2, length + 3)
            this.list.length > 40 && (this.work = false)
            callback()
          }.bind(this), 2000)
        } else {
          this.status = 'complete'
          this.text = '没有更多内容了~'
          setTimeout(callback, 1000)
        }
      }
    }
  }
</script>
```

```
<template>
    <div>
        下拉加载
        <load-more class="load-more" :pull="true" :duration="duration" direction="top"
                   @change="change" @release="release" @load="load">
            <div slot="loading" class="loading" :style="loadingStyle">
                <span class="icon" :style="iconStyle" v-show="['init','loading'].includes(status)"></span>
                <span class="text">{{text}}</span>
            </div>
            <div class="content">
                <div v-for="(value,index) in list" :key="index">{{value}}</div>
            </div>
        </load-more>
    </div>
</template>

<style>
    .load-more {
        height: 400px;
        border: 1px solid;
    }

    .loading {
        font-size: 0;
        line-height: 1rem;
        text-align: center;
    }

    .loading .icon {
        display: inline-block;
        vertical-align: middle;
        margin-right: .2rem;
        width: .7rem;
        height: .7rem;
        background: center no-repeat;
        background-size: contain;
    }

    .loading .text {
        vertical-align: middle;
        color: #d37123;
        font-size: .5rem;
    }

    .content {
        background: grey;
    }
</style>

<script>
  import {LoadMore} from 'vui'

  export default {
    components: {
      LoadMore
    },
    data() {
      return {
        duration: 500, // 必须保证loading的transitionDuration与duration属性一致
        text: '下拉加载',
        status: 'init', // 状态，包含init、loading、complete三种
        isPulling: false, // 是否正在pull
        progress: 0, // pull距离百分比
        work: true,
        list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
      }
    },
    computed: {
      loadingStyle() {
        return {
          transform: this.status === 'init' ? `scale(${Math.min(this.progress / 100, 1)})` : '',
          transitionDuration: `${this.status === 'init' && !this.isPulling ? this.duration : 0}ms`
        }
      },
      iconStyle(){
        return {
          transform: this.status === 'init' ? `rotate(${3.6 * this.progress}deg)` : '',
          backgroundImage: (() => {
            switch (this.status) {
              case 'init':
                return `url(${require('./loading.png')})`
              case 'loading':
                return `url(${require('./loading.gif')})`
            }
          })(),
          transitionDuration: `${this.status === 'init' && !this.isPulling ? this.duration : 0}ms`
        }
      }
    },
    methods: {
      change(progress) {
        this.isPulling = true
        this.progress = progress
        this.status = 'init'
        this.text = progress > 100 ? '松开加载' : '下拉加载'
      },
      release(progress) { // 手指松开
        this.isPulling = false
        this.progress = progress >= 100 ? 100 : 0
      },
      load(callback){
        if (this.work) {
          this.status = 'loading'
          this.text = '正在加载'
          setTimeout(function () {
            const length = this.list.length

            this.list.push(length + 1, length + 2, length + 3)
            this.list.push(length + 1, length + 2, length + 3)
            this.list.length > 40 && (this.work = false)
            this.status = 'complete'
            this.text = '加载完成'
            this.progress = 0
            callback()
          }.bind(this), 2000)
        } else {
          this.progress = 0
          this.status = 'complete'
          this.text = '没有更多内容了~'
          setTimeout(callback, 1000)
        }
      }
    }
  }
</script>
```

## 属性

名称|类型|必填|默认值|描述
:-:|:-:|:-:|:-:|:-:
direction|`String`|`N`|`top`|加载loading元素所在的位置，支持`top`,`bottom`,`left`,`right`
pull|`Boolean`|`N`|`true`|是pull加载还是scroll加载，true表示pull
work|`Boolean`|`N`|`true`|是否还需要加载，false表示不再需要加载了，此时loading元素将不再显示。不过可以设置work为true，然后控制loading逻辑来实现自定义效果，如demo中那样
duration|`Number`|`N`|`400`|loading元素的过渡时间
pullThreshold|`Number`|`N`|`100`|为pull模式时，触发加载动作的拉动距离，单位px，scroll模式无效。**在移动端注意要根据不同设备像素比设置不同阈值，否则用户感知的拉动距离不一致**
scrollThreshold|`Number`|`N`|`0`|为scroll模式时，触发加载动作的阈值,单位px，pull模式无效 **（如scrollThreshold为50，则表示距离滚动到末尾还差50px时就触发加载动作，常用来进行预加载）.在移动端注意要根据不同设备像素比设置不同阈值）**
angle|`Number`|`N`|`45`|pull或者scroll有效的角度，比如direction为top或者bottom，angle为30，则表示手指初始滑动的方向与垂直方向的夹角要<=30度，否则无法pull或者scroll

## 插槽

名称|必填|说明
:-:|:-:|:-:
默认|`Y`|内容区域
loading|`N`|loading元素区域

## 事件

名称|参数|说明
:-:|:-:|:-:
change|`{progress}`|pull模式才有效，手指pull时触发，progress表示相对于pullThreshold拉动的距离百分比
release|`{progress}`|pull模式才有效，手指pull松开时触发，progress表示相对于pullThreshold拉动的距离百分比
appear|`-`|scroll模式才有效，当loading元素出现时触发
load|`{callback}`|触发加载动作时触发，**当数据更新完成后一定要执行回调函数，否则loading元素不会隐藏，且无法再次触发加载**