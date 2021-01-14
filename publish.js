const glob = require('glob')
const KS3 = require('@vivo/ks3')
const bucket = 'cdnjs'
const ks3 = new KS3(process.argv[2], process.argv[3], bucket, process.argv[4])
const packageJson = require('./package.json')
const distRelativePath = './dist'

async function uploadFile(fileRelativePath) {
  return new Promise((resolve, reject) => {
    ks3.object.put(
      {
        Bucket: bucket,
        Key: `${packageJson.name}/${packageJson.version}${fileRelativePath.replace(distRelativePath, '')}`,
        filePath: fileRelativePath,
        ACL: 'public-read'
      },
      function (error, data, res) {
        if (error) {
          reject(error)
          return
        }

        resolve()
      }
    )
  })
}

glob
  .sync(`${distRelativePath}/**`, {
    nodir: true
  })
  .forEach(async fileRelativePath => {
    console.log(`开始上传：${fileRelativePath}`)

    try {
      await uploadFile(fileRelativePath)
      console.log(`上传成功：${fileRelativePath}`)
    } catch (e) {
      console.error(`上传失败：${fileRelativePath}`)
    }
  })
