<template>
  <popup-picker :class="$options.name" v-if="address" :value="value" :data="address" :selected="indexs" v-bind="$attrs"
                @input="$listeners.input" @update="update($event,true)" @confirm="update($event)"></popup-picker>
</template>

<script>
  import { libName } from '../../config'
  import ajax from '../../tools/ajax/index'
  import PopupPicker from '../popup-picker/index.vue'

  // 地址数据格式转化
  function format (address) {
    const data = {}

    if (address instanceof Array) {
      data.options = address.slice()
    } else {
      data.options = []
      Object.keys(address).forEach((value) => {
        if (address[value] instanceof Array && !address[value].length) {
          data.options.push(value)
        } else {
          data.options.push({
            value,
            children: format(address[value])
          })
        }
      })
    }

    return data
  }

  export default {
    name: `${libName}-city-picker`,
    components: {
      PopupPicker
    },
    props: {
      value: Boolean,
      selected: Array,
      filter: { // 过滤特殊地区
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        address: undefined
      }
    },
    computed: {
      indexs () { // 将省市区名称转化成索引
        if (!this.address || this.selected === undefined) {
          return undefined
        }

        let options = this.address.options
        const indexs = []

        this.selected.forEach((value) => {
          indexs.push(options.findIndex(function (v) {
            if ((v.children ? v.value : v) === value) {
              if (v.children) {
                options = v.children.options
              }

              return true
            }
          }))
        })

        return indexs
      }
    },
    watch: {
      filter: {
        handler () {
          this.getAddress()
        },
        immediate: true
      }
    },
    methods: {
      getAddress () {
        ajax({
          url: `//shequwsdl.vivo.com.cn/shequ/address_${this.filter ? 'filter' : 'full'}.json`,
          success: result => {
            this.address = format(result)
          }
        })
      },
      update (indexs, isUpdate) { // 将索引转换成省市区名称
        let options = this.address.options

        this.$emit(isUpdate ? 'update' : 'confirm', indexs.map(function (value) {
          value = options[value]

          if (value.children) {
            options = value.children.options
            value = value.value
          }

          return value
        }))
      }
    }
  }
</script>
