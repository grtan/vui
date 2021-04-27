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
