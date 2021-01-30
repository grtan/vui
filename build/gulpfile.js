const path = require('path')
const fse = require('fs-extra')
const gulp = require('gulp')
const gulpPostcss = require('gulp-postcss')
const gulpDartSass = require('gulp-dart-sass')
const gulpModifyFile = require('./gulp-modify-file')
const gulpRename = require('gulp-rename')
const postcss = require('postcss')
const postcssUrl = require('postcss-url')
const postcssScss = require('postcss-scss')
const postcssAtrule = require('./postcss-atrule')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const src = path.resolve(__dirname, '../src')
const lib = path.resolve(__dirname, '../lib')
const dist = path.resolve(__dirname, '../dist')
const importeeSeparator = '_____'

// 获取importee绝对路径
function getImporteeAbsolutePath(importer, importee) {
  if (path.isAbsolute(importee)) {
    return importee
  }

  const importerDir = path.dirname(importer)
  const importeePkgName = importee.replace(/^~([^/]+)\/.+$|.*/, '$1')

  // 从npm模块导入
  if (importeePkgName) {
    const cwd = process.cwd()

    process.chdir(importerDir)
    importee = importee.replace(
      /^[^/]+/,
      path.relative(importerDir, path.dirname(require.resolve(`${importeePkgName}/package.json`)))
    )
    process.chdir(cwd)
  }

  // importee绝对路径
  return path.resolve(importerDir, importee)
}

// 获取被导入文件真实的路径
function getImporteeInfo(importer, importee) {
  const originalImportee = importee
  // 被导入文件是否是Partials
  const importeeIsPartials = path.basename(importee).startsWith('_')
  // 被导入文件后缀名
  const importeeExtname = path.extname(importee)

  // 绝对路径
  importee = getImporteeAbsolutePath(importer, importee)

  if (!importeeExtname) {
    // 被导入文件没有写后缀名
    if (fse.pathExistsSync(`${importee}.scss`)) {
      return {
        // 被导入文件的真实绝对路径
        path: `${importee}.scss`,
        /**
         * 被导入文件的类型
         * 1  xxx.scss
         * 2  _xxx.scss
         * 3  xxx.css
         */
        type: importeeIsPartials ? 2 : 1
      }
    } else if (!importeeIsPartials && fse.pathExistsSync(`${importee.replace(/([^/]+)$/, '_$1')}.scss`)) {
      return {
        path: `${importee.replace(/([^/]+)$/, '_$1')}.scss`,
        type: 2
      }
    } else if (fse.pathExistsSync(`${importee}.css`)) {
      return {
        path: `${importee}.css`,
        type: 3
      }
    } else {
      throw new Error(`${importer}中导入的文件${originalImportee}不存在`)
    }
  } else {
    // 被导入文件写了后缀名
    if (importeeExtname === '.scss') {
      if (fse.pathExistsSync(importee)) {
        return {
          path: importee,
          type: importeeIsPartials ? 2 : 1
        }
      } else if (!importeeIsPartials && fse.pathExistsSync(importee.replace(/([^/]+)$/, '_$1'))) {
        return {
          path: importee.replace(/([^/]+)$/, '_$1'),
          type: 2
        }
      } else {
        throw new Error(`${importer}中导入的文件${originalImportee}不存在`)
      }
    } else if (importeeExtname === '.css') {
      if (fse.pathExistsSync(importee)) {
        return {
          path: importee,
          type: 3
        }
      } else {
        throw new Error(`${importer}中导入的文件${originalImportee}不存在`)
      }
    } else {
      throw new Error(`${importer}中导入的文件${originalImportee}后缀名错误`)
    }
  }
}

/**
 * 替换css/css文件里url资源的路径
 * @param {*} from 被import的文件绝对路径
 * @param {*} to 最终被打包到的文件绝对路径
 * @param {*} isLib 是否为lib构建处理，此时需要保留按npm包引用的方式
 */
async function handleImportee(from, to, isLib) {
  return postcss([
    postcssAtrule({
      async modifier(name, importee, importer) {
        // 已经转换过
        if (importee.includes(importeeSeparator)) {
          return
        }

        const originalImportee = importee

        importee = getImporteeAbsolutePath(importer, importee)

        // 原生css @import，需要转换导入路径并拷贝相应资源文件
        if (name === 'import' && importee.endsWith('.css')) {
          // 不需要转换或者已经转换过
          if ((isLib && /^~[^/]+/.test(originalImportee)) || !fse.pathExistsSync(importee)) {
            return
          }

          let dest = importee.replace(src, `${isLib ? lib : dist}/assets`)

          // 从npm包中引入的资源
          if (/\/node_modules\//.test(importee)) {
            // lib中保留npm包引用方式
            if (isLib) {
              return {
                name,
                path: importee.replace(/.*\bnode_modules\//, '~')
              }
            }

            dest = importee.replace(/.*\/(node_modules\/)/, `${dist}/assets/$1`)
          }

          // 非src或者node_modules中的资源文件
          if (dest === importee) {
            dest = `${isLib ? lib : dist}/assets${importee}`
          }

          if (fse.pathExistsSync(importee)) {
            fse.copySync(importee, dest)
            // css中有可能又引用了其他css或者图片等资源，需要递归处理
            await handleImportee(importee, dest, isLib)
          } else {
            throw new Error(`${importer}中导入的资源${importee}不存在`)
          }

          const pt = path.relative(path.dirname(to), dest)

          // 路径一致不需要转换
          if (pt === originalImportee) {
            return
          }

          return {
            name,
            path: pt
          }
        }

        // 替换导入资源路径为特定格式
        return {
          name,
          path: `${to}${importeeSeparator}${importee}`
        }
      }
    }),
    postcssUrl({
      url({ url, absolutePath }) {
        // 资源路径为http、base64或者其他协议地址，或者包含sass变量
        if (/^([a-zA-Z]+:|\/\/)|\$/.test(url)) {
          return url
        }

        // 这里自己解析绝对路径，是为了可以实现~前缀引用npm包的方式
        absolutePath = getImporteeAbsolutePath(from, url)
        let dest = absolutePath.replace(src, `${isLib ? lib : dist}/assets`)

        // 从npm包中引入的资源
        if (/\/node_modules\//.test(absolutePath)) {
          // TODO: 考虑npm包存在多个版本的情况
          // lib中保留npm包引用方式
          if (isLib) {
            return absolutePath.replace(/.*\bnode_modules\//, '~')
          }

          dest = absolutePath.replace(/.*\/(node_modules\/)/, `${dist}/assets/$1`)
        }

        // 非src或者node_modules中的资源文件
        if (dest === absolutePath) {
          dest = `${isLib ? lib : dist}/assets${absolutePath}`
        }

        // 拷贝资源文件到目标路径
        if (fse.pathExistsSync(absolutePath)) {
          fse.copySync(absolutePath, dest)
        } else {
          throw new Error(`${from}中导入的资源${url}不存在`)
        }

        return path.relative(path.dirname(to), dest)
      }
    })
  ])
    .process(
      fse.readFileSync(from, {
        encoding: 'utf8'
      }),
      {
        syntax: postcssScss,
        from
      }
    )
    .then(result => {
      return result.css
    })
}

async function genLibSkin() {
  return gulp
    .src([`${src}/**/[^_]*.scss`])
    .pipe(
      // 修改入口文件，充分利用递归处理
      gulpModifyFile((content, pt, file) => {
        return `@use "${pt.replace(src, lib).replace(/\.[^./]*$/, '.css')}${importeeSeparator}${pt}"`
      })
    )
    .pipe(
      gulpDartSass({
        importer(importee, importer, done) {
          // 不知道为啥有时候获取的是file:///xxxx格式的地址
          if (importee.startsWith('file:')) {
            importee = require('url').fileURLToPath(importee)
          }

          if (importer.startsWith('file:')) {
            importer = require('url').fileURLToPath(importer)
          }

          // 文件构建后对应的路径
          const dest = importee.split(importeeSeparator)[0]

          importee = importee.split(importeeSeparator)[1]

          // 嵌套时的importer
          if (importer.includes(importeeSeparator)) {
            importer = importer.split(importeeSeparator)[1]
          }

          /**
           * 将importee转成绝对路径，否则有多层导入嵌套时，相对路径会出问题
           * 详见 https://sass-lang.com/documentation/js-api#importer
           * If the stylesheet was loaded from an importer that returned its contents, it’s the URL of the @use or @import rule that loaded it.
           */
          // 获取importee的信息：真实路径、文件类型、npm包名
          const { path: importeePath, type: importeeType } = getImporteeInfo(importer, importee)

          if (/\/node_modules\//.test(importeePath)) {
            // 引入的文件是npm包中的
            if ([1, 2].includes(importeeType)) {
              /**
               * xxx.scss/_xxx.scss文件，由于不会生成对应的css文件，所以需要打包进来
               * 并且要替换资源url路径成~packageName/xxx这种npm包引用的形式
               */
              handleImportee(importeePath, dest, true).then(content => {
                done({
                  contents: content
                })
              })
            } else {
              /**
               * xxx.css文件，@use @import @forward 都可能导入css文件
               * 这里我们不需要打包进来，只需要转换成@import "~xx/xxx.css"形式
               */
              done({
                contents: `@import "${importeePath.replace(/.*\bnode_modules\//, '~')}";`
              })
            }
          } else {
            // 引入的文件是src目录中的
            if ([1, 3].includes(importeeType) && importer !== importee) {
              /**
               * xxx.scss/xxx.css 且非入口文件
               * 因为这些文件都会生成对应的css文件，为了避免冗余的css代码，不将这些文件打包进来，而是改成普通css @import的方式
               * 这样也不需要额外转换资源url路径，因为src中的资源会被拷贝到lib中相同的位置
               *
               * 注意：xxx.scss文件里不能导出变量，@mixin等
               *
               * importer !== importee表示不能是入口文件
               */
              done({
                // 统一成lib目录路径后计算相对路径
                contents: `@import "${path
                  .relative(path.dirname(dest), importeePath.replace(src, lib))
                  .replace(/\.[^./]*$/, '.css')}";`
              })
            } else {
              /**
               * 入口xxx.scss文件
               * 或者是_xxx.scss，这种文件只包含变量、@mixin等，不会包含实际的css代码，所以这里必须将这些文件打包进来
               * 同时要转换资源url路径
               */
              handleImportee(importeePath, dest, true).then(content => {
                done({
                  contents: content
                })
              })
            }
          }
        }
      })
    )
    .pipe(
      gulpPostcss([
        autoprefixer(),
        cssnano({
          preset: [
            'default',
            {
              normalizeWhitespace: false
            }
          ]
        })
      ])
    )
    .pipe(gulp.dest(lib))
}

async function genDistSkin() {
  // 生成vui.css
  await new Promise(resolve => {
    gulp
      .src(`${src}/modules/style/index.scss`)
      .pipe(
        // 修改入口文件，充分利用递归处理
        gulpModifyFile((content, pt, file) => {
          return `@use "${path.resolve(__dirname, '../dist/vui.css')}${importeeSeparator}${pt}"`
        })
      )
      .pipe(
        gulpDartSass({
          importer(importee, importer, done) {
            // 不知道为啥有时候获取的是file:///xxxx格式的地址
            if (importee.startsWith('file:')) {
              importee = require('url').fileURLToPath(importee)
            }

            if (importer.startsWith('file:')) {
              importer = require('url').fileURLToPath(importer)
            }

            // 文件构建后对应的路径
            const dest = importee.split(importeeSeparator)[0]

            importee = importee.split(importeeSeparator)[1]

            // 嵌套时的importer
            if (importer.includes(importeeSeparator)) {
              importer = importer.split(importeeSeparator)[1]
            }

            /**
             * 将importee转成绝对路径，否则有多层导入嵌套时，相对路径会出问题
             * 详见 https://sass-lang.com/documentation/js-api#importer
             * If the stylesheet was loaded from an importer that returned its contents, it’s the URL of the @use or @import rule that loaded it.
             */
            // 获取importee的信息：真实路径、文件类型、npm包名
            const { path: importeePath } = getImporteeInfo(importer, importee)

            handleImportee(importeePath, dest).then(content => {
              done({
                contents: content
              })
            })
          }
        }).on('error', gulpDartSass.logError)
      )
      .pipe(
        gulpPostcss([
          autoprefixer(),
          cssnano({
            preset: [
              'default',
              {
                normalizeWhitespace: false
              }
            ]
          })
        ])
      )
      .pipe(
        gulpRename(({ dirname, basename, extname }) => {
          return {
            dirname,
            basename: 'vui',
            extname
          }
        })
      )
      .pipe(gulp.dest(dist))
      .on('end', resolve)
  })
  // 生成vui.min.css
  await new Promise(resolve => {
    gulp
      .src(`${dist}/vui.css`)
      .pipe(
        gulpPostcss([
          cssnano({
            preset: 'default'
          })
        ])
      )
      .pipe(
        gulpRename(({ dirname, basename, extname }) => {
          return {
            dirname,
            basename: 'vui.min',
            extname
          }
        })
      )
      .pipe(gulp.dest(dist))
      .on('end', resolve)
  })
}

exports.default = gulp.parallel(genLibSkin, genDistSkin)

// 监控模式
exports.watch = function (cb) {
  const config = {
    delay: 500,
    ignoreInitial: false
  }

  gulp.watch(`${src}/**/*.scss`, config, genDistSkin)
  cb()
}
