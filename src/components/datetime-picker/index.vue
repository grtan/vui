<template>
  <popup-picker
    v-if="datetime"
    :value="value"
    :title="config.title"
    :data="datetime"
    :selected="indexs"
    v-bind="$attrs"
    @input="$listeners.input"
    @update="update($event,true)"
    @confirm="update($event)"
  ></popup-picker>

</template>

<script>
  import ajax from '../../tools/ajax/index'
  import PopupPicker from '../popup-picker/index.vue'



  import makeData from '../../tools/datetime/makeData'
  import timeFormate from '../../tools/datetime/format'
  import { scrypt } from 'crypto';

  const NOW = new Date()
  const NOW_MONTH = NOW.getMonth() + 1<10?`0${NOW.getMonth() + 1}`:NOW.getMonth() + 1
  const NOW_DATE = NOW.getDate()<10?`0${NOW.getDate()}`:NOW.getDate()
  const NOW_HOUR = NOW.getHours()<10?`0${NOW.getHours()}`:NOW.getHours()
  const NOW_MINUTE = NOW.getMinutes()<10?`0${NOW.getMinutes()}`:NOW.getMinutes()
  const NOW_SECOND = NOW.getSeconds()<10?`0${NOW.getSeconds()}`:NOW.getSeconds()
  
  export default {
    name: 'vui-datetime-picker',
    components: {
      PopupPicker
    },
    props: {
      value: Boolean,
      format: {
        default:'YYYY-MM-DD HH:mm:ss',
        type:String
      },
      startDate: {
        default:'2010-01-01',
        type:String
      },
      endDate: {
        default:'2030-12-31',
        type:String
      },
      title: {
        default:'选择日期',
        type:String
      }
    },
    data () {
      return {
        datetime: undefined,
        config : null,
        selected:`${NOW.getFullYear()}-${NOW_MONTH}-${NOW_DATE}`
      }
    },
    computed: {
      indexs () { // 化成索引
        if (!this.datetime || this.config.selected === undefined) {
          return undefined
        }
        let options = this.datetime.options
        const indexs = []
        const _arr = this.config.selected.split('-')

        _arr.forEach((value) => {
          indexs.push(options.findIndex(function (v) {
            if ((v.children ? v.value : v) == value) {
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
      value(n,o){
      }
    },
    created() {
      let _time = `${NOW.getFullYear()}-${NOW_MONTH}-${NOW_DATE} ${NOW_HOUR}:${NOW_MINUTE}:${NOW_SECOND}`
      this.format == 'YYYY-MM-DD HH:mm:ss' && (this.selected = _time)
      this.config = {
        selected:this.selected,
        format:this.format,
        startDate:this.startDate,
        endDate:this.endDate,
        title:this.title
      }
      this.config.selected = this.formatSelected()
    },
    mounted() {
      const _data = {
        startDate:this.config.startDate,
        endDate:this.config.endDate,
        selected:this.config.selected
      }
      this.$nextTick(() => {
        this.datetime = makeData(_data,this.config.format)
      })
    },
    methods: {
      formatSelected(){
        let re =''
        let d=new Date(this.config.selected);
        let year=d.getFullYear();
        let month=change(d.getMonth()+1);
        let day=change(d.getDate());
        let hour=change(d.getHours());
        let minute=change(d.getMinutes());
        let second=change(d.getSeconds());
        function change(t){
          if(t<10){
          return "0"+t;
          }else{
          return t;
          }
        }
        this.format == 'YYYY-MM-DD HH:mm:ss' 
          ? (re = `${year}-${month}-${day}-${hour}-${minute}-${second}`)
          : (re = `${year}-${month}-${day}`)
        return `${re}`
      },

      // 获取选取的时间
      getValue(indexs){
        let options = this.datetime.options
        return indexs.map(function (value) {
          value = options[value]

          if (value.children) {
            options = value.children.options
            value = value.value
          }
          return value
        })
      },
      update (indexs, isUpdate) {
        let _arr = this.getValue(indexs)
        let _newArr1=[]
        let _newArr2=[]
        let _string = ''
        if(_arr.length>3){
          _newArr1 = _arr.slice(0,3)
          _newArr2 = _arr.slice(3,_arr.length)
          _string = `${_newArr1.join('-')} ${_newArr2.join(':')}`
        }else{
          _arr[0].length>2 ? (_string = `${_arr.join('-')}`) : (_string = `${_arr.join(':')}`)

        }
        this.$emit(isUpdate ? 'update' : 'confirm', _string)
      }
    }
  }
</script>