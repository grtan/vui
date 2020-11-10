const path = require('path')
const fse = require('fs-extra')
const gulp = require('gulp')
const gulpPostcss = require('gulp-postcss')
const gulpDartSass = require('gulp-dart-sass')
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

async function genLibSkin() {
  return gulp
    .src([`${src}/**/[^_]*.scss`])
    .pipe(
      gulpPostcss(
        [
          // 如果@use非片段scss文件，全部外置成对应的css文件
          postcssAtrule({
            modifier(name, importee, importer) {
              // 非@use导入或者导入模块为片段文件
              if (name !== 'use' || /\b_[^/]+$/.test(importee)) {
                return
              }

              // 判断是不是省略了片段文件的_前缀
              const absolutePath = path.resolve(
                path.dirname(importer),
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
        ],
        {
          syntax: postcssScss
        }
      )
    )
    .pipe(gulpDartSass().on('error', gulpDartSass.logError))
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
  const skinTemp = path.resolve(__dirname, '../.skin-temp')

  // 创建临时目录
  fse.removeSync(skinTemp)
  // 生成vui.css
  await new Promise(resolve => {
    gulp
      .src(`${src}/modules/style/index.scss`)
      .pipe(
        gulpPostcss(
          [
            // 如果@use非片段scss文件，全部外置成对应的css文件
            postcssAtrule({
              modifier(name, importee, importer) {
                if (name !== 'use' || path.isAbsolute(importee)) {
                  return
                }

                importee = path.resolve(path.dirname(importer), importee)

                return {
                  // 故意修改成错误路径，因为dart-sass只有找不到文件时才调用自定义的importer
                  path: path.resolve(skinTemp, path.relative(src, importee))
                }
              }
            })
          ],
          {
            syntax: postcssScss
          }
        )
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
  // 删除临时目录
  fse.removeSync(skinTemp)
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

// 拷贝资源
function copyAssets() {
  return gulp.src(`${src}/**/*.{jpg,jpeg,png,gif,webp}`).pipe(gulp.dest(lib))
}

exports.default = gulp.parallel(genLibSkin, genDistSkin, copyAssets)
