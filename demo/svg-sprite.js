/**
 * 自定义挂载svg元素的行为
 * 从svg-sprite-loader/runtime/browser-sprite.js中拷贝过来的
 * 第三方依赖改成了构建后文件的路径
 */
import BrowserSprite from 'svg-baker-runtime'
import domready from 'domready'

const spriteNodeId = '__SVG_SPRITE_NODE__'
const spriteGlobalVarName = '__SVG_SPRITE__'
const isSpriteExists = !!window[spriteGlobalVarName]

// eslint-disable-next-line import/no-mutable-exports
let sprite

if (isSpriteExists) {
  sprite = window[spriteGlobalVarName]
} else {
  sprite = new BrowserSprite({
    attrs: {
      id: spriteNodeId,
      'aria-hidden': 'true',
      // 给svg元素添加自定义类名
      class: 'vui-icon__symbols'
    }
  })
  window[spriteGlobalVarName] = sprite
}

const loadSprite = () => {
  /**
   * Check for page already contains sprite node
   * If found - attach to and reuse it's content
   * If not - render and mount the new sprite
   */
  const existing = document.getElementById(spriteNodeId)

  if (existing) {
    sprite.attach(existing)
  } else {
    sprite.mount(document.body, true)
  }
}

if (document.body) {
  loadSprite()
} else {
  domready(loadSprite)
}

export default sprite
