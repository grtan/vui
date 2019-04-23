<template>
  <div id="app" :class="$style.app">
    <Error :error="error"></Error>
    <loading :loading="isLoading"></loading>
    <header :class="$style.header">
      <div class="is-size-6 has-text-grey-light level is-mobile" :class="$style.back" @click="back">
        <span class="icon"><i class="iconfont icon-fanhui-"></i></span>
        <span>返回</span>
      </div>
      <router-link class="icon" :class="$style.home" :to="{name:'index'}"><i
          class="iconfont icon-zhuye is-size-5 has-text-grey-light"></i></router-link>
      <h1 class="subtitle has-text-centered has-text-white" :class="$style.title"><a target="_blank"
                                                                                     :href="`#${$route.fullPath}`">{{title}}</a>
      </h1>
    </header>
    <cutover type="cover" :checkBack="true" :class="$style.cutover">
      <template slot-scope="slot">
        <cache>
          <router-view :style="slot.styleObj"></router-view>
        </cache>
      </template>
    </cutover>
  </div>
</template>

<style src="./assets/style/my-bulma.css"></style>

<style module>
  html, body, .app, .cutover {
    height: 100%;
  }

  .header {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    padding: .3rem;
    background: #35495e;
  }

  .back {
    position: absolute;
    top: .3rem;
    left: .2rem;
  }

  .back > :last-child {
    margin-left: -.2em;
  }

  .home {
    position: absolute;
    right: .5rem;
    top: .35rem;
  }

  .title > a {
    display: inline-block;
    vertical-align: top;
    max-width: 60%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .cutover {
    box-sizing: border-box;
    padding-top: 1.37rem;
  }

  .cutover > * {
    box-sizing: border-box;
    padding: .3rem;
    height: 100%;
    overflow: auto;
    background: #fff;
  }
</style>

<script>
  import Error from '@/component/Error/Index.vue'
  import Loading from '@/component/Loading/Index.vue'
  import { mapState } from 'vuex'
  import { Cutover, Cache } from 'vui'

  export default {
    components: {
      Loading,
      Error,
      Cutover,
      Cache
    },
    computed: {
      ...mapState({
        isLoading: state => state.loading.isLoading,
        error: state => state.error,
        title: 'title'
      })
    },
    methods: {
      back() {
        history.back()
      }
    }
  }
</script>
