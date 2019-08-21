export default function (html) {
  const div = document.createElement('div')
  const first = document.body.firstChild

  div.innerHTML = html
  ;[].slice.call(div.children).forEach(function (el) {
    if (first) {
      document.body.insertBefore(el, first)
    } else {
      document.body.appendChild(el)
    }
  })
}
