const path = require('path')
const { spawnSync } = require('child_process')
const WebHook = require('webhook').default

new WebHook({
  onTagEvent() {
    spawnSync('git', ['checkout', '2.x'])
    spawnSync('git', ['pull'])
    spawnSync('npm', ['run', 'docs:build'])
    spawnSync('npm', ['run', 'build'], {
      cwd: path.resolve(__dirname, 'demo')
    })
  }
}).listen(3004)
