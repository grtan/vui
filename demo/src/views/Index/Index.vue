<template>
  <div :class="$style.home">
    <template v-for="item in demos">
      <h2 class="has-text-centered is-size-6 has-text-black" :class="$style.category">{{item.category}}</h2>
      <aside class="menu">
        <template v-for="itm in item.list">
          <h3 class="menu-label is-size-6 has-text-grey-dark" :class="$style.type">
            {{itm.category}}</h3>
          <ul class="menu-list">
            <li v-for="(value,index) in itm.list" :key="index" :class="$style.item">
              <span class="icon has-text-grey-light is-pulled-right" :class="$style.arrow"><i
                  class="iconfont icon-jinru-"></i></span>
              <router-link :to="{name:value.routeName}" class="has-text-grey">{{value.name}}</router-link>
            </li>
          </ul>
        </template>
      </aside>
    </template>
  </div>
</template>

<style module>
  .home {
    padding: 0;
  }

  .category {
    padding: .4rem 0;
  }

  .type {
    margin: 0 !important;
    padding: .2rem;
    background: #eaebec;
  }

  .item:not(:first-of-type) {
    border-top: 1px solid #eee;
  }

  .arrow {
    margin: .225rem .1rem 0 0;
  }
</style>

<script>
  export default {
    data () {
      return {
        demos: [{
          category: '组件',
          list: [{
            category: '布局',
            list: [{
              name: 'layer 蒙层',
              routeName: 'layer'
            }, {
              name: 'popup 弹层',
              routeName: 'popup'
            }]
          }, {
            category: '反馈',
            list: [{
              name: 'toast 提升',
              routeName: 'toast'
            }, {
              name: 'dialog 对话框',
              routeName: 'dialog'
            }, {
              name: 'loading 加载提示',
              routeName: 'loading'
            }, {
              name: 'swipeout 滑动删除',
              routeName: 'swipeout'
            }, {
              name: 'collapse 折叠面板',
              routeName: 'collapse'
            }]
          }, {
            category: '过渡',
            list: [{
              name: 'cutover 元素切换',
              routeName: 'cutover'
            }]
          }, {
            category: '输入',
            list: [{
              name: 'picker 滚动选择器',
              routeName: 'picker'
            }, {
              name: 'popup-picker 弹层选择器',
              routeName: 'popup-picker'
            }, {
              name: 'city-picker 省市区选择',
              routeName: 'city-picker'
            }, {
              name: 'switch 开关',
              routeName: 'switch'
            }]
          }, {
            category: '滚动',
            list: [{
              name: 'load-more 加载更多',
              routeName: 'load-more'
            }]
          }]
        }, {
          category: '指令',
          list: [{
            category: '数据输入',
            list: [{
              name: '省市区选择',
              routeName: 'city-picker'
            }, {
              name: '省市区选择',
              routeName: 'city-picker'
            }]
          }, {
            category: '页面切换',
            list: [{
              name: '元素切换',
              routeName: 'cutover'
            }]
          }]
        }]
      }
    }
  }
</script>
