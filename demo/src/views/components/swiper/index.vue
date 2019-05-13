<template>
  <div>
    <p :class="$style.config" class="is-size-5 has-text-centered">配置</p>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">方向</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control level is-mobile">
            <label class="radio level-item"><input type="radio" name="direction" value="left"
                                                   v-model="direction">left</label>
            <label class="radio level-item"><input type="radio" name="direction" value="right"
                                                   v-model="direction">right</label>
            <label class="radio level-item"><input type="radio" name="direction" value="up"
                                                   v-model="direction">up</label>
            <label class="radio level-item"><input type="radio" name="direction" value="down"
                                                   v-model="direction">down</label>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">是否循环</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control level is-mobile">
            <label class="checkbox"><input type="checkbox" name="loop" v-model="loop">{{loop}}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">切换间隔时间</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control level is-mobile">
            <label class="radio level-item"><input type="radio" name="interval" value="3000"
                                                   v-model.number="interval">3000ms</label>
            <label class="radio level-item"><input type="radio" name="interval" value="5000"
                                                   v-model.number="interval">5000ms</label>
            <label class="radio level-item"><input type="radio" name="interval" value="10000"
                                                   v-model.number="interval">10000ms</label>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">是否可以手指滑动</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <label class="checkbox"><input type="checkbox" name="swipe" v-model="swipe">{{swipe}}</label>
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.swiper">
      <swiper v-model="index" :direction="direction" :loop="loop" :interval="interval" :swipe="swipe">
        <swiper-item v-for="item in list">
          <div :class="$style.item" :style="{backgroundImage:`url(${item})`}"></div>
        </swiper-item>
      </swiper>
      <div :class="$style.thumb">
        <span v-for="n in list.length" :class="{[$style.active]:n-1===index}" @click="index=n-1"></span>
      </div>
    </div>
  </div>
</template>

<style module>
  .config {
    padding-bottom: .4rem;
  }

  .swiper {
    position: relative;
  }

  .item {
    height: 5rem;
    background: center / cover no-repeat;
  }

  .thumb {
    position: absolute;
    left: 0;
    right: 0;
    bottom: .3rem;
    display: flex;
    justify-content: center;
  }

  .thumb span {
    margin: 0 .1rem;
    width: .2rem;
    height: .2rem;
    border-radius: 50%;
    background: #ccc;
  }

  .thumb .active {
    background: #456fff;
  }
</style>

<script>
  import { Swiper, SwiperItem } from 'vui'

  export default {
    components: {
      Swiper,
      SwiperItem
    },
    data () {
      return {
        index: 0,
        direction: 'left',
        loop: true,
        interval: 3000,
        swipe: true,
        list: [
          'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1557722658&di=2322efbf1cae53cb93c3a388a284ee8b&src=http://img17.3lian.com/d/file/201702/20/ec4acb80b76b3e84fe58f48b558908d3.jpg',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557732742520&di=c46e7363b51903a4b2b1fe571b61d712&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F5%2F513026b307cb2.jpg',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557732742519&di=c22463343c48ca4546ad59945c42d7ed&imgtype=0&src=http%3A%2F%2Fimg17.3lian.com%2Fd%2Ffile%2F201702%2F23%2F6e12cb5e536cbaaa63d4f841f8bcb1dc.jpg',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557732742519&di=5662fca66769dec436808aa95b25f598&imgtype=0&src=http%3A%2F%2Fpic.rmb.bdstatic.com%2Ff54083119edfb83c4cfe9ce2eeebc076.jpeg',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557732742517&di=34c081d7ed2e16133b705adee136648a&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1606%2F29%2Fc11%2F23527926_1467193551983_mthumb.png'
        ]
      }
    }
  }
</script>
