import Vue from 'vue'
function toast (content, { position = 'bottom', time = 2000 } = {}) {
  Vue.$vivo.toast.show({
    type: 'text',
    text: content,
    position: position,
    time: time
  })
}
export default toast
