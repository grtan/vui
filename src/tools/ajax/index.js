function formatParams (params) {
  params = Object.assign({
    __timestamp__: Date.now()
  }, params)

  return Object.keys(params).map(function (value) {
    return `${value}=${params[value]}`
  }).join('&')
}

function getStatus (code) {
  switch (code) {
    case 200:
      return 'success'
    case 304:
      return 'notmodified'
    default:
      return 'error'
  }
}

export default function (options) {
  const xhr = new window.XMLHttpRequest()
  const params = formatParams(options.params)
  const async = options.async !== undefined ? options.async : true
  const type = (options.type || 'get').toLowerCase()
  let completed

  xhr.timeout = options.timeout || 0
  xhr.responseType = options.dataType || 'json'
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      const status = getStatus(xhr.status)

      completed = true
      if (status === 'success') {
        options.success && options.success(xhr.response, status, xhr)
      } else {
        options.error && options.error(xhr, status, xhr.statusText)
      }
      options.complete && options.complete(status, xhr)
    }
  }
  xhr.ontimeout = function () {
    options.error && options.error(xhr, 'timeout', xhr.statusText)
    options.complete && options.complete('timeout', xhr)
  }
  xhr.abort = function () {
    if (!completed) {
      xhr.abort()
      options.error && options.error(xhr, 'abort', xhr.statusText)
      options.complete && options.complete('abort', xhr)
    }
  }

  if (type === 'get') {
    xhr.open(type, options.url + `${options.url.indexOf('?') === -1 ? '?' : '&'}` + params, async)
    xhr.send(null)
  } else {
    xhr.open(type, options.url, async)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send(params)
  }
}
