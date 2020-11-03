const path = require('path')
const Koa = require('koa')
const serve = require('koa-static')
const docServer = new Koa()
const demoServer = new Koa()

docServer.use(
  serve(path.resolve(__dirname, 'dist'), {
    maxage: 30000
  })
)
demoServer.use(
  serve(path.resolve(__dirname, '../demo/dist'), {
    maxage: 30000
  })
)

docServer.listen(3002)
demoServer.listen(3003)
