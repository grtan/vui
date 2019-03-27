function has (ele, cls) {
  return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}
// 为指定的dom元素添加样式
function add (ele, cls) {
  if (!this.has(ele, cls)) ele.className += ' ' + cls
}
// 删除指定dom元素的样式
function remove (ele, cls) {
  if (has(ele, cls)) {
    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}
// 如果存在(不存在)，就删除(添加)一个样式
function toggle (ele, cls) {
  if (has(ele, cls)) {
    remove(ele, cls)
  } else {
    add(ele, cls)
  }
}

export default {
  has,
  add,
  remove,
  toggle
}