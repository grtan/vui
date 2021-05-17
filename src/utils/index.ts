import { getNetType } from '@vivo/v-jsbridge'
import { NETWORK } from './const'

// 将图片生成blob
// export function getImageDataURL(image: any) {
//   // 创建画布
//   const canvas = document.createElement('canvas')
//   canvas.width = image.width
//   canvas.height = image.height
//   const ctx = canvas.getContext('2d')
//   // 以图片为背景剪裁画布
//   ctx.drawImage(image, 0, 0, image.width, image.height)
//   // 获取图片后缀名
//   const extension = image.src.substring(image.src.lastIndexOf('.') + 1).toLowerCase()
//   // 某些图片 url 可能没有后缀名，默认是 png
//   return canvas.toDataURL('image/' + extension, 1)
// }

// export function downLoad(downloadName: any, url: any) {
//   const tag = document.createElement('a')
//   // 此属性的值就是下载时图片的名称，注意，名称中不能有半角点，否则下载时后缀名会错误
//   tag.setAttribute('download', downloadName.replace(/\./g, '。'))

//   const image = new Image()
//   // 设置 image 的 url, 添加时间戳，防止浏览器缓存图片
//   image.src = url + '?time=' + new Date().getTime()
//   // 重要，设置 crossOrigin 属性，否则图片跨域会报错
//   image.setAttribute('crossOrigin', 'Anonymous')
//   // 图片未加载完成时操作会报错
//   image.onload = () => {
//     tag.href = getImageDataURL(image)
//     tag.click()
//   }
// }

// 自定义setInterval和clearInterval
const { setInterval, clearInterval } = (function () {
  const intervalIds: Record<string, number> = {}
  let id = 0

  function setInterval(callback: (...args: any[]) => any, delay: number, ...args: any[]) {
    const intervalId = ++id

    function fn() {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      intervalIds[intervalId] = window.setTimeout(async () => {
        try {
          // eslint-disable-next-line standard/no-callback-literal
          await callback(...args)
        } catch (e) {}

        /**
         * 上一个callback中没有调用clearInterval时才继续执行
         *
         * 这里将fn放在callback之后，特意等callback执行完后再延时delay时间才继续执行callback
         * 防止callback执行时间超过delay时，callback被不间断地添加到任务队列中，从而导致js线程一直处于繁忙状态
         */
        if (intervalIds[intervalId] !== undefined) {
          fn()
        }
      }, delay)
    }

    fn()

    return intervalId
  }

  function clearInterval(intervalId: number) {
    clearTimeout(intervalIds[intervalId])
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete intervalIds[intervalId]
  }

  return { setInterval, clearInterval }
})()

export { setInterval, clearInterval }

/**
 * 监控网络类型，单例模式
 * 参数为函数callback (netType: 0 | 1 | 2) => any
 *  0  获取失败
 *  1  断网
 *  2  wifi
 *  3  流量
 * 返回值为函数，调用可停止传入的callback监听网络类型
 */
export const monitorNetType = (function () {
  let intervalId: number | undefined
  const callbacks: Array<(netType: typeof NETWORK[keyof typeof NETWORK]) => any> = []

  return function (cbFn: typeof callbacks[0]) {
    if (!callbacks.includes(cbFn)) {
      callbacks.push(cbFn)
    }

    if (intervalId === undefined) {
      intervalId = setInterval(async function () {
        const { code, value } = await Promise.race([
          getNetType(),
          // 平台不支持jsbridge
          new Promise(resolve => {
            setTimeout(() => {
              resolve({
                code: 404
              })
            }, 2000)
          })
        ])

        if (code) {
          // 获取失败
          callbacks.forEach(cbFn => cbFn(NETWORK.UNKNOWN))
        } else if (!value) {
          // 断网
          callbacks.forEach(cbFn => cbFn(NETWORK.DISCONNECTED))
        } else if (value === 'WIFI') {
          // wifi
          callbacks.forEach(cbFn => cbFn(NETWORK.WIFI))
        } else {
          // 流量
          callbacks.forEach(cbFn => cbFn(NETWORK.MOBILE))
        }
      }, 2000)
    }

    // 停止该监听回调
    return function () {
      const index = callbacks.indexOf(cbFn)

      if (index !== -1) {
        callbacks.splice(index, 1)
      }

      // 所有回调已移除，停止监听
      if (!callbacks.length && intervalId !== undefined) {
        clearInterval(intervalId)
        intervalId = undefined
      }
    }
  }
})()

export function formatFileSize(size: number, digits = 0) {
  if (size < 1024) {
    return `${size.toFixed(digits)}B`
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(digits)}KB`
  }

  if (size < 1024 * 1024 * 1024) {
    return `${(size / 1024 / 1024).toFixed(digits)}M`
  }

  return `${(size / 1024 / 1024 / 1024).toFixed(digits)}G`
}

// 获取页面viewport缩放比例
export function getViewportScale() {
  const viewport = document.querySelector('meta[name=viewport]')
  let scale = 1

  if (viewport) {
    const content = viewport.getAttribute('content')

    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    scale = parseFloat(content?.replace(/^.*\binitial-scale\s*=\s*([\d.]+).*$|^.*$/, '$1') || '1')
  }

  /**
   * 当在根元素(<html>元素)上使用clientWidth时，将返回viewport的宽度，不管html元素宽度是大于还是小于视口宽度
   * innerWidth获取的宽度包含了垂直滚动条的宽度，documentElement.clientWidth则不包含
   * 不过移动端滚动条几乎都是悬浮的，不占宽度，可以忽略
   */
  const viewportWidth = document.documentElement.clientWidth || window.innerWidth

  /**
   * outerWidth获取浏览器窗口外部的宽度
   * screen.availWidth返回浏览器窗口最大可占用的水平宽度（并不是当前实际窗口宽度）
   * screen.width返回的始终是整个屏幕的宽度（哪怕浏览器不是全屏，返回的也是整个屏幕的宽度）
   *
   * 这三个宽度不受缩放影响，可以理解成scale=1时的大小
   */
  const windowWidth = window.outerWidth || window.screen.availWidth || window.screen.width

  // pc端viewport没作用，所以还需要判断实际缩放情况
  return windowWidth / viewportWidth - scale < 0.1 ? scale : 1
}

// 获取页面滚动距离
export function getPageScroll() {
  return {
    left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
    top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
  }
}

/**
 * 获取元素相对viewport视口的位置
 * 因为getBoundingClientRect会受transform的影响，所以不能直接用getBoundingClientRect获取
 */
export function getRectToViewport(el: HTMLElement) {
  if ([document.documentElement, document.body].includes(el)) {
    const { left, top, width, height } = el.getBoundingClientRect()

    return {
      left,
      top,
      width,
      height
    }
  }

  let left = el.offsetLeft
  let top = el.offsetTop
  const width = el.offsetWidth
  const height = el.offsetHeight

  // 到body结束
  while (el.offsetParent) {
    const prev = el

    el = el.offsetParent as HTMLElement
    /**
     * 元素到body的offsetLeft/Top已经包含了border和margin
     * 所以需要去掉body的clientLeft/Top
     */

    if (el === document.body) {
      const pageScroll = getPageScroll()

      left += el.offsetLeft - pageScroll.left
      top += el.offsetTop - pageScroll.top

      if (['static', 'relative'].includes(window.getComputedStyle(prev).position)) {
        const { marginLeft, marginTop } = window.getComputedStyle(document.documentElement)

        left += parseFloat(marginLeft)
        top += parseFloat(marginTop)
      }
    } else {
      left += el.offsetLeft + el.clientLeft
      top += el.offsetTop + el.clientTop
    }
  }

  return {
    left,
    top,
    width,
    height
  }
}
