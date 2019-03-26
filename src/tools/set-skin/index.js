export default function (skin) { // 设置皮肤
  const html = document.documentElement

  skin = skin || 'default'

  if (skin === 'default') {
    html.removeAttribute('vui-skin')
  } else {
    html.setAttribute('vui-skin', skin)
  }
}
