# popup-picker 弹层选择器

> popup-picker是一个弹层选择器

## 使用方法

```
<button @click="show=!show">开关</button>
<popup-picker appear v-model="show" :data="data" :selected="selected" :enable3d="enable3d" :sync="sync"
                  @update="update" @confirm="confirm"></popup-picker>
```

```
import {PopupPicker} from 'vui';

export default {
    components: {
        PopupPicker
    },
    data: {
        show: true,
        data: function () {
              var num = 3;

              function deep() {
                  var index = arguments[0] || 0,
                      data = {
                          name: 'label' + index,
                          options: []
                      };

                  for (var i = 0; i < 60; i++) {
                      data.options.push((index < num - 1) && Math.random() > 0.5 ? {
                          value: index + '-' + (arguments[1] || 0) + '-' + i,
                          children: deep(index + 1, i)
                      } : index + '-' + (arguments[1] || 0) + '-' + i);
                  }

                  return data;
              }

              return deep();
          }(),
        selected: [0, 0, 0],
        enable3d: true,
        sync: true
    },
    methods: {
        update(value){
            console.log(value);
        },
        confirm(value){
            console.log(value);
        },
    }
};
```

## 属性

名称|类型|必填|默认值|描述
:-:|:-:|:-:|:-:|:-:
cancel|`String`|`N`|`取消`|取消按钮文本，为空不显示
confirm|`String`|`N`|`确定`|确定按钮文本，为空不显示

`data`、`selected`、`sync`、`enable3d`属性跟picker组件一致

`v-model`、`title`属性跟dialog组件一致

## 事件

名称|参数|说明
:-:|:-:|:-:
confirm|(`value`)|点击确定按钮时触发，参数同update事件

`update`事件与picker组件一致