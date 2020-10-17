const path = require('path')
const fse = require('fs-extra')
const gulp = require('gulp')
const gulpDartSass = require('gulp-dart-sass')
const gulpModifyFile = require('./gulp-modify-file')
const gulpRename = require('gulp-rename')
const postcss = require('postcss')
const postcssUrl = require('postcss-url')
const autoprefixer = require('autoprefixer')
const postcssScss = require('postcss-scss')
const postcssAtrule = require('./postcss-atrule')

const src = path.resolve(__dirname, `..${path.sep}src`)
const lib = path.resolve(__dirname, `..${path.sep}lib`)
const dist = path.resolve(__dirname, `..${path.sep}dist`)

function genLibSkin(cb) {
  gulp
    .src([`${src}/**/[^_]*.scss`])
    .pipe(
      gulpModifyFile((content, pt) => {
        return new Promise(resolve => {
          postcss([
            autoprefixer(),
            // 如果@use非片段scss文件，全部外置成对应的css文件
            postcssAtrule({
              modifier(name, importee) {
                // 非@use导入或者导入模块为片段文件
                if (name !== 'use' || /\b_[^/]+$/.test(importee)) {
                  return
                }

                // 判断是不是省略了片段文件的_前缀
                const absolutePath = path.resolve(
                  path.dirname(pt),
                  importee.replace(/\b_?([^/.]+)(\.[^./]+)?$/, '_$1.scss')
                )

                if (fse.pathExistsSync(absolutePath)) {
                  return
                }

                // 去掉后缀
                importee = importee.replace(/\.[^./]*$/, '')

                /**
                 * 将@use './xx/xx.scss'替换成@import './xx/xx.css'
                 * 注意事项：@use非片段文件模块时，不能使用其任何变量，同时片段文件模块中只能用来导出变量，不能包含任何实际的样式
                 */
                return {
                  name: 'import',
                  path: `${importee}.css`
                }
              }
            })
          ])
            .process(content, {
              syntax: postcssScss,
              from: pt
            })
            .then(result => {
              resolve(result.css)
            })
        })
      })
    )
    .pipe(gulpDartSass().on('error', gulpDartSass.logError))
    .pipe(gulp.dest(lib))
    .on('end', function () {
      cb()
    })
}

function genDistSkin(cb) {
  const skinTemp = path.resolve(__dirname, `..${path.sep}.skin-temp`)

  fse.removeSync(skinTemp)
  gulp
    .src(`${src}/modules/index.scss`)
    .pipe(
      gulpModifyFile((content, pt) => {
        return new Promise(resolve => {
          postcss([
            // 如果@use非片段scss文件，全部外置成对应的css文件
            postcssAtrule({
              modifier(name, importee) {
                if (name !== 'use' || path.isAbsolute(importee)) {
                  return
                }

                importee = path.resolve(path.dirname(pt), importee)

                return {
                  // 故意修改成错误路径，因为dart-sass只有找不到文件时才调用自定义的importer
                  path: path.resolve(skinTemp, path.relative(src, importee))
                }
              }
            })
          ])
            .process(content, {
              syntax: postcssScss,
              from: pt
            })
            .then(result => {
              resolve(result.css)
            })
        })
      })
    )
    .pipe(
      gulpDartSass({
        // 打包皮肤入口样式文件时替换各组件样式文件中的url路径
        importer(importee, importer, done) {
          if (!path.isAbsolute(importee)) {
            importee = path.resolve(path.dirname(importer), importee)
          }

          // 假定被导入的模块不是片段文件
          importee = path.resolve(
            path.dirname(importee),
            path
              .basename(importee)
              .replace(/^_/, '')
              .replace(/(\.[^./]*)?$/, '.scss')
          )
          // 对应src中的文件路径
          let source = path.resolve(src, path.relative(skinTemp, importee))

          if (!fse.pathExistsSync(source)) {
            source = path.resolve(path.dirname(source), `_${path.basename(source)}`)
            importee = path.resolve(path.dirname(importee), `_${path.basename(importee)}`)
          }

          if (fse.pathExistsSync(importee)) {
            return done({
              file: importee
            })
          }

          // 替换url
          postcss([
            autoprefixer(),
            postcssUrl({
              url({ url, absolutePath }) {
                if (path.isAbsolute(url) || /^(https?:)?\/\//.test(url)) {
                  return url
                }

                return path.relative(dist, absolutePath.replace(src, lib))
              }
            })
          ])
            .process(
              fse.readFileSync(source, {
                encoding: 'utf8'
              }),
              {
                syntax: postcssScss,
                from: source
              }
            )
            .then(result => {
              fse.outputFileSync(importee, result.css)
              done({
                file: importee
              })
            })
        }
      }).on('error', gulpDartSass.logError)
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
    .on('end', function () {
      fse.removeSync(skinTemp)
      cb()
    })
}

// 拷贝资源
function copyAssets(cb) {
  gulp
    .src(`${src}/**/*.{jpg,jpeg,png,gif,webp}`)
    .pipe(gulp.dest(lib))
    .on('end', function () {
      cb()
    })
}

exports.default = gulp.parallel(genLibSkin, genDistSkin, copyAssets)
