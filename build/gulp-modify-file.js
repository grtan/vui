const through = require('through2')

module.exports = function (fn) {
  return through.obj(async function (file, enc, cb) {
    const contents = (await fn(String(file.contents), file.path, file)) || file.contents

    if (file.isBuffer() === true) {
      file.contents = Buffer.from(contents)
    }

    cb(null, file)
  })
}
