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
            <label class="radio level-item">
              <input type="radio" name="direction" value="left" v-model="direction" />left
            </label>
            <label class="radio level-item">
              <input type="radio" name="direction" value="right" v-model="direction" />right
            </label>
            <label class="radio level-item">
              <input type="radio" name="direction" value="up" v-model="direction" />up
            </label>
            <label class="radio level-item">
              <input type="radio" name="direction" value="down" v-model="direction" />down
            </label>
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
            <label class="checkbox">
              <input type="checkbox" name="loop" v-model="loop" />
              {{loop}}
            </label>
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
            <label class="radio level-item">
              <input type="radio" name="interval" value="3000" v-model.number="interval" />3000ms
            </label>
            <label class="radio level-item">
              <input type="radio" name="interval" value="5000" v-model.number="interval" />5000ms
            </label>
            <label class="radio level-item">
              <input type="radio" name="interval" value="10000" v-model.number="interval" />10000ms
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">滑动角度</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control level is-mobile">
            <label class="radio level-item">
              <input type="radio" name="angle" value="5" v-model.number="angle" />5度
            </label>
            <label class="radio level-item">
              <input type="radio" name="angle" value="30" v-model.number="angle" />30度
            </label>
            <label class="radio level-item">
              <input type="radio" name="angle" value="60" v-model.number="angle" />60度
            </label>
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
            <label class="checkbox">
              <input type="checkbox" name="swipe" v-model="swipe" />
              {{swipe}}
            </label>
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.swiper">
      <swiper
        v-model="index"
        :direction="direction"
        :loop="loop"
        :duration="400"
        :interval="interval"
        :angle="angle"
        :swipe="swipe"
        @wait="wait=$event"
      >
        <swiper-item v-for="(item,index) in list" :key="index">
          <div :class="$style.item" :style="{backgroundImage:`url(${item})`}"></div>
        </swiper-item>
      </swiper>
      <div :class="$style['thumb-list']">
        <div :class="$style.thumb" v-for="n in list.length" :key="n" @click="index=n-1">
          <div :style="{width:`${n-1===wait.index?wait.progress:0}%`}"></div>
        </div>
      </div>
    </div>
    <p>其他效果（可以根据实时位置自定义各种效果）</p>
    <div :class="$style.swiper">
      <swiper v-model="index2" @pos-change="onPosChange2" :interval="0">
        <swiper-item v-for="(item,index) in list" :key="index">
          <div
            :class="$style.item"
            :style="[{backgroundImage:`url(${item})`},getStyle2(slotProps.index)]"
            slot-scope="slotProps"
          ></div>
        </swiper-item>
      </swiper>
    </div>
    <div :class="$style.swiper">
      <swiper v-model="index3" @pos-change="onPosChange3" :interval="0" :loop="false">
        <swiper-item v-for="(item,index) in list" :key="index">
          <div slot-scope="slotProps" :class="$style.item3" :style="getStyle3(slotProps.index)">
            <div>{{index}}</div>
            <template v-if="index===list.length-1">
              <div>{{list.length}}</div>
              <div>{{list.length+1}}</div>
            </template>
          </div>
        </swiper-item>
      </swiper>
    </div>
    <div :class="$style.swiper">
      <swiper v-model="index4" @pos-change="onPosChange4" :interval="0" :loop="false">
        <swiper-item v-for="n in 7" :key="n">
          <div slot-scope="slotProps" :class="$style.item4" :style="getStyle4(slotProps.index)">
            <div v-if="n<7">{{n-1}}</div>
            <section v-else>更多</section>
          </div>
        </swiper-item>
      </swiper>
    </div>
    <div :class="[$style.swiper,$style.swiper5]">
      <swiper
        :style="{transform:`rotateY(${-pos5*90}deg)`}"
        v-model="index5"
        @pos-change="onPosChange5"
        :interval="0"
      >
        <swiper-item v-for="n in 7" :key="n">
          <div slot-scope="slotProps" :style="getStyle5(slotProps.index)">{{n-1}}</div>
        </swiper-item>
      </swiper>
    </div>
    <div :class="[$style.swiper,$style.swiper6]">
      <swiper v-model="index6" @pos-change="onPosChange6" :interval="0" :loop="false">
        <swiper-item v-for="n in 7" :key="n">
          <div slot-scope="slotProps" :style="getStyle6(slotProps.index)">
            <div>
              {{n-1}}
              <div :class="$style.left" :style="getLeftStyle(slotProps.index)"></div>
              <div :class="$style.right" :style="getRightStyle(slotProps.index)"></div>
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<style module>
.config {
  padding-bottom: 0.4rem;
}

.swiper {
  position: relative;
  margin: 0.5rem 0;
}

.item {
  height: 5rem;
  background: center / cover no-repeat;
}

.thumb-list {
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  bottom: 0.3rem;
  display: flex;
  justify-content: center;
}

.thumb {
  margin: 0 0.1rem;
  width: 1rem;
  height: 0.2rem;
  background: #ccc;
}

.thumb div {
  height: 100%;
  background: #456fff;
}

.item3 {
  display: flex;
  justify-content: space-between;
}

.item3 > div {
  width: 30%;
  height: 3rem;
  background: grey;
}

.item4 > div {
  width: 70%;
  height: 3rem;
  background: grey;
}

.item4 > section {
  width: 40%;
  height: 3rem;
  background: grey;
}

.swiper5 {
  overflow: hidden;
  perspective: 40rem;
  perspective-origin: center 65%;
}

.swiper5 :global(.vui-swiper) {
  margin: auto;
  box-sizing: content-box;
  width: 6rem;
  height: 4rem;
  padding: 1rem;
  position: relative;
  overflow: visible;
  transform-style: preserve-3d;
}

.swiper5 :global(.vui-swiper-list) {
  transform: none !important;
}

.swiper5 :global(.vui-swiper-item > div) {
  position: absolute;
  left: 1rem;
  right: 1rem;
  top: 1rem;
  bottom: 1rem;
  background: linear-gradient(30deg, #999, #eee);
  backface-visibility: hidden;
}

.swiper6 :global(.vui-swiper-item > div > div) {
  position: relative;
  margin: auto;
  width: 30%;
  height: 4rem;
  background: #ccc;
}

.swiper6 .left,
.swiper6 .right {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.swiper6 .left {
  background-image: linear-gradient(270deg, rgba(0, 0, 0, 0.5), transparent);
}

.swiper6 .right {
  background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.5), transparent);
}
</style>

<script>
import { Swiper, SwiperItem } from 'vui'

export default {
  components: {
    Swiper,
    SwiperItem
  },
  data() {
    return {
      index: 0,
      direction: 'left',
      loop: true,
      interval: 3000,
      angle: 30,
      swipe: true,
      wait: {},
      list: [
        'http://i9.hexun.com/2018-11-24/195299307.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557732742520&di=c46e7363b51903a4b2b1fe571b61d712&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F5%2F513026b307cb2.jpg',
        'http://www.hubei.gov.cn/zhuanti/2016zt/2016trwr/2016trwrwh/201601/W020160126606049779228.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557732742519&di=5662fca66769dec436808aa95b25f598&imgtype=0&src=http%3A%2F%2Fpic.rmb.bdstatic.com%2Ff54083119edfb83c4cfe9ce2eeebc076.jpeg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557732742517&di=34c081d7ed2e16133b705adee136648a&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1606%2F29%2Fc11%2F23527926_1467193551983_mthumb.png'
      ],
      index2: 0,
      pos2: 1,
      index3: 0,
      pos3: 0,
      index4: 0,
      pos4: 0,
      index5: 0,
      pos5: 1,
      index6: 0,
      pos6: 0
    }
  },
  methods: {
    onPosChange2(pos) {
      this.pos2 = pos
    },
    getStyle2(index) {
      const scale = 0.8 - Math.abs(this.pos2 - index) * 0.15
      const opacity = 1 - Math.abs(this.pos2 - index) * 0.6

      return {
        opacity: opacity >= 0 ? opacity : 0,
        transform: `scale(${scale >= 0 ? scale : 0}) translateX(${(this.pos2 - index) * 35}%)`
      }
    },
    onPosChange3(pos) {
      this.pos3 = pos
    },
    getStyle3(index) {
      return {
        transform: `translateX(${(this.pos3 - index) * 65}%)`
      }
    },
    onPosChange4(pos) {
      this.pos4 = pos
    },
    getStyle4(index) {
      if (this.pos4 < 5.25) {
        return {
          transform: `translateX(${(this.pos4 - index) * 20}%)`
        }
      }

      return {
        transform: `translateX(${(this.pos4 - index) * 20 + (this.pos4 - 5.25) / 0.75 * 60}%)`
      }
    },
    onPosChange5(pos) {
      this.pos5 = pos
    },
    getStyle5(index) {
      return {
        transform: `rotateY(${index * 90}deg) translateZ(3rem)`,
        visibility: Math.abs(index - this.pos5) < 1 ? 'visible' : 'hidden'
      }
    },
    onPosChange6(pos) {
      this.pos6 = pos
    },
    getStyle6(index) {
      return {
        transform: `translateX(${(this.pos6 - index) * 75}%) perspective(7rem) translateZ(-2rem) rotateY(${(this.pos6 - index) * 30}deg)`
      }
    },
    getLeftStyle(index) {
      return {
        display: index < this.pos6 ? 'block' : 'none',
        opacity: Math.abs(this.pos6 - index) / 2
      }
    },
    getRightStyle(index) {
      return {
        display: index > this.pos6 ? 'block' : 'none',
        opacity: Math.abs(this.pos6 - index) / 2
      }
    }
  }
}
</script>
