<template>
  <div class='getData' id='getData' v-if="data">
    <div style="margin:.5rem">
      <flexbox>
        <div>
          <x-button type="default" @click.native="getNextPage()">请求下页数据 <br/>共两页数据</x-button>
        </div>
        <div>
          <x-button type="primary" @click.native="getErrorPage">发起请求<br/>自身消化错误处理</x-button>
        </div>
        <div>
          <x-button type="warn" @click.native="getNextPage(false)">发起错误请求<br/>系统级处理错误</x-button>
        </div>
      </flexbox>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>礼包名称</th>
          <th>剩余件数</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in data" :key="index">
          <td class="item">{{item.one}}</td>
          <td class="item">{{item.two}}件</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import API from '@/api'
import Utils from '@/utils'
import { XButton, Flexbox } from '@vivo/vivo-ui'
export default {
  name: 'getData',
  components: {
    XButton,
    Flexbox
  },
  data () {
    return {
      pageNo: 0,
      data: null
    }
  },
  methods: {
    async getErrorPage () {
      let res = await API.getData.getErrorInfo({ pageNo: this.pageNo, acceptError: true })
      if (res.code == 0) {
        Utils.toast('请求成功')
      } else {
        Utils.toast(res.msg || '接口出错')
      }
    },
    async getNextPage (errorLevel) {
      var mark = false
      if (errorLevel === false) {
        mark = true
      }
      this.pageNo++
      errorLevel = errorLevel || false

      if (errorLevel !== undefined) {
        this.pageNo = 1111111111111111
      }
      let response
      // API访问
      if (!mark) {
        response = await API.getData.getInfo({ pageNo: this.pageNo, acceptError: errorLevel })
        if (errorLevel && response.retcode != 0) {
          Utils.toast('数据请求错误')
          return
        }
        this.$nextTick(() => {
          if (this.data) {
            this.data = response.data.list.concat(this.data)
          } else {
            this.data = response.data.list
          }
        })
      } else {
        // 模仿系统级错误
        response = await API.getData.getInfo1({ pageNo: this.pageNo, acceptError: errorLevel })
      }
    }
  },
  async mounted () {
    this.getNextPage()
  }
}
</script>
<style lang="less">
.getData,
.weui-btn {
  font-size: 0.09rem !important;
  .table {
    width: 100%;
    font-size: 0.5rem;
    .item {
      text-align: center;
    }
  }
}
</style>
