const path = require('path')
const Koa = require('koa')
const serve = require('koa-static')
const distServer = new Koa()

// 构建后的dist资源，供文档中在线编辑demo访问
distServer.use(serve(path.resolve(__dirname, '../dist')))
distServer.listen(3010)

// 非开发模式，提供文档、demo资源访问
if (process.argv[2] !== '-d') {
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
  docServer.listen(3011)
  demoServer.listen(3012)
}
