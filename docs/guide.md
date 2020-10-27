# 快速上手

## 安装

```bash
npm i @game/utils --registry http://npm.vivo.com.cn
```

安装时记得将npm源设置成[公司内部npm仓库](http://npm.vivo.com.cn)

## 使用

### 按需引入

```javascript
import { methodA, methodB, ... } from '@game/utils'

methodA()
methodB()
```

### 整体引入

```javascript
import utils from '@game/utils/dist/utils.js'

utils.methodA()
utils.methodB()
```

或通过`<script>`标签引入

```javascript
<script src="xxx/node_modules/@game/utils/dist/utils.min.js"></script>
<script>
  VG_UTILS.methodA()
  VG_UTILS.methodB()
</script>
```


