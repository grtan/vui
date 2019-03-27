<template>
  <div>
    <p :class="$style.config" class="is-size-5 has-text-centered">配置</p>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">滚动时立即更新值</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <label class="checkbox"><input type="checkbox" name="sync" v-model="sync">{{sync}}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">3d旋转样式</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <label class="checkbox"><input type="checkbox" name="enable3d" v-model="enable3d">{{enable3d}}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">级联关系</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <label class="checkbox"><input type="checkbox" name="cascade" v-model="cascade">{{cascade}}</label>
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.picker">
      <picker :data="data" :enable3d="enable3d" :sync="sync" @update="update"></picker>
    </div>
    <p>当前选中的列index：{{indexs.join('-')}}</p>
  </div>
</template>

<style module>
  .config {
    padding-bottom: .4rem;
  }

  .item {
    padding: .2rem .5rem;
  }

  .picker {
    padding: .25rem 0;
    height: 7.5rem;
  }
</style>

<script>
  import { Picker } from 'vui'

  export default {
    components: {
      Picker
    },
    data () {
      return {
        sync: false,
        enable3d: false,
        cascade: false,
        indexs: [],
        data1: function () {
          var data = []

          for (var i = 0; i < 3; i++) {
            data.push({
              name: '列' + (i + 1),
              options: function () {
                var arr = [], i = 0

                for (; i < 100; i++) {
                  arr.push(i)
                }

                return arr
              }()
            })
          }

          return data
        }(),
        data2: function () {
          var num = 3

          function deep () {
            var index = arguments[0] || 0,
              data = {
                name: '列' + (index + 1),
                options: []
              }

            for (var i = 0; i < 80; i++) {
              data.options.push((index < num - 1) && (!i || Math.random() > 0.5) ? {
                value: index + '-' + (arguments[1] || 0) + '-' + i,
                children: deep(index + 1, i)
              } : index + '-' + (arguments[1] || 0) + '-' + i)
            }

            return data
          }

          return deep()
        }()
      }
    },
    computed: {
      data() {
        return this.cascade ? this.data2 : this.data1
      }
    },
    methods: {
      update(value) {
        this.indexs = value
      }
    }
  }
</script>
