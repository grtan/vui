<template>
  <div class="vui-pagination">
    <a class="vui-pagination-btn" :vui-disabled="value===1" @click="value>1&&goto(value-1)">上一页</a>
    <div>
      <a v-for="(page,index) in list" :key="index" @click="page!=='...'&&goto(page)" :vui-disabled="page==='...'"
         :vui-selected="page===value">{{page}}</a>
    </div>
    <a class="vui-pagination-btn" :vui-disabled="value===total" @click="value<total&&goto(value+1)">下一页</a>
    <template v-if="showGoto">
      <span class="vui-pagination-prompt">共{{total}}页，跳转至<input type="text" :value="num" @input="input"
                                                                @keyup.enter="num&&goto(num)"/>页</span>
      <a class="vui-pagination-btn" :vui-disabled="!num" @click="num&&goto(num)">确定</a>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'vui-pagination',
    props: {
      total: { // 总页数
        type: Number,
        required: true
      },
      value: { // 当前页
        type: Number,
        default: 1
      },
      size: { // 最多显示几个按钮，要求为>=5的奇数
        type: Number,
        default: 7
      },
      showGoto: { // 是否显示goto区域
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        num: undefined // 输入的页码
      }
    },
    computed: {
      list () {
        let pages = []
        let type
        let start
        let end

        // 根据当前页码和总页数动态渲染
        if (this.value <= (this.size + 1) / 2) { // 左边没省略号
          if (this.total <= this.size) { // 右边没省略号
            type = 0
          } else {
            type = 1
          }
        } else {
          if (this.value + (this.size - 1) / 2 >= this.total) { // 右边没省略号
            type = 2
          } else {
            type = 3
          }
        }

        switch (type) {
          case 0: // 左右两边都没有省略号
            start = 0
            end = this.total
            while (start < end) {
              pages.push(++start)
            }
            break
          case 1: // 右边有省略号，左边没有
            start = 0
            end = this.size - 2
            while (start < end) {
              pages.push(++start)
            }
            pages.push('...', this.total)
            break
          case 2: // 左边有省略号，右边没有
            start = this.total - this.size + 2
            end = this.total
            pages.push(1, '...')
            while (start < end) {
              pages.push(++start)
            }
            break
          case 3: // 左右两边都有省略号
            start = this.value - (this.size - 3) / 2
            end = this.value + (this.size - 5) / 2
            pages.push(1, '...')
            while (start < end) {
              pages.push(++start)
            }
            pages.push('...', this.total)
            break
        }

        return pages
      }
    },
    methods: {
      input (event) { // 限定输入值在页码范围内
        let value = Number(event.target.value.replace(/\D/g, ''))

        if (value) {
          value = value > this.total ? this.total : value
          event.target.value = value // 必须要手动设置值，因为当this.num=this.total后，再输入大于this.total的value时，vue不会去更新input元素
          this.num = value
        } else {
          event.target.value = ''
          this.num = undefined
        }
      },
      goto (num) {
        this.$emit('input', num)
      }
    }
  }
</script>