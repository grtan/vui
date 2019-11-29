const path = require('path')
const fs = require('fs')
const fse = require('fs-extra')
const klaw = require('klaw')
const gulp = require('gulp')
const gulpConcat = require('gulp-concat')
const gulpModifyFile = require('gulp-modify-file')
const gulpRename = require('gulp-rename')
const gulpLess = require('gulp-less')
const gulpCleanCss = require('gulp-clean-css')
const gulpPxtorem = require('gulp-pxtorem')
const gulpUglify = require('gulp-uglify')
const gulpBase64 = require('gulp-base64')
const gulpBase64Img = require('gulp-base64-img')
const gulpSourcemaps = require('gulp-sourcemaps')
const gulpSvgSymbols = require('gulp-svg-symbols')
const LessAutoPrefix = require('less-plugin-autoprefix')
const LessCleanCSS = require('less-plugin-clean-css')
const rollup = require('rollup')
const rollupResolve = require('rollup-plugin-node-resolve')
const rollupCommonjs = require('rollup-plugin-commonjs')
const rollupUrl = require('rollup-plugin-url')
const rollupBabel = require('rollup-plugin-babel')
const rollupVue = require('rollup-plugin-vue')
const autoprefixer = require('autoprefixer')
const postcssPxtorem = require('postcss-pxtorem')
const postcssUrl = require('postcss-url')
const postcssPlugins = require('./postcss.config').plugins
const src = path.join(process.cwd(), 'src') // src目录路径
const srcDirName = 'src' // src目录名
const libDirName = 'lib' // lib目录名
const distDirName = 'dist' // dist目录名
const libName = 'vui' // 库名称

function deleteDist (cb) {
  fse.removeSync(path.join(__dirname, distDirName))
  cb()
}

async function createDistJs (cb) {
  const bundle = await rollup.rollup({
    input: `${srcDirName}/index.js`,
    plugins: [
      rollupVue({
        defaultLang: {
          style: 'less'
        },
        style: {
          postcssPlugins: [autoprefixer, postcssPxtorem(postcssPlugins.pxtorem), postcssUrl(postcssPlugins.url)]
        },
        template: {
          isProduction: true
        }
      }),
      rollupBabel({
        runtimeHelpers: true,
        /**
         * 添加.vue后缀支持，否则const不会转换成var
         * https://github.com/rollup/rollup-plugin-babel/issues/260
         */
        extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.vue'],
        include: `${srcDirName}/**`, // 只编译我们的源代码
        exclude: `${srcDirName}/assets/**` // 这里必须要排除assets目录，否则由于runtimeHelpers的原因，babel会在代码中import一些库，从而导致commonjs插件认为这是一个es6模块，从而不进行转换，导致报错
      }),
      rollupResolve(),
      rollupCommonjs(),
      rollupUrl({
        limit: Number.MAX_VALUE, // 所有图片都内嵌，否则用户使用时还需要针对图片配置loader才能引用
        // 支持'**/*.{jpg|jpeg|png|gif|svg|bmp}'形式
        include: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.gif', '**/*.svg', '**/*.bmp']
      })
    ]
  })

  await bundle.write(Object.assign({
    file: `${distDirName}/${libName}.js`,
    format: 'umd',
    name: 'VUI'
  }))
  cb()
}

function createDistMinJs (cb) {
  gulp.src(`${distDirName}/${libName}.js`)
    .pipe(gulpSourcemaps.init())
    .pipe(gulpUglify())
    .pipe(gulpRename({
      extname: '.min.js'
    }))
    .pipe(gulpSourcemaps.write('./'))
    .pipe(gulp.dest(distDirName))
    .on('end', function () {
      cb()
    })
}

function createDistCss (cb) {
  gulp.src([`${srcDirName}/**/*.less`, `!${srcDirName}/assets/**`])
    .pipe(gulpLess({
      rewriteUrls: 'all', // url路径相对被引入的less而不相对entry less
      plugins: [
        new LessAutoPrefix()
      ]
    }))
    .pipe(gulpPxtorem(postcssPlugins.pxtorem))
    .pipe(gulpBase64({ // 将url文件转成base64
      maxImageSize: Number.MAX_VALUE
    }))
    .pipe(gulpConcat(`${libName}.css`))
    .pipe(gulp.dest(distDirName))
    .on('end', function () {
      cb()
    })
}

function createDistMinCss (cb) {
  gulp.src(`${distDirName}/${libName}.css`)
    .pipe(gulpSourcemaps.init())
    .pipe(gulpCleanCss())
    .pipe(gulpRename({
      extname: '.min.css'
    }))
    .pipe(gulpSourcemaps.write('./'))
    .pipe(gulp.dest(distDirName))
    .on('end', function () {
      cb()
    })
}

/**
 * 编译js、vue文件
 * @param file  文件绝对路径
 */
async function compile (file) {
  // 获取file相对src目录的路径
  const relative = path.relative(src, path.join(path.dirname(file), path.basename(file, path.extname(file))))
  const bundle = await rollup.rollup({
    input: file,
    plugins: [
      rollupVue({
        defaultLang: {
          style: 'less'
        },
        style: {
          postcssPlugins: [autoprefixer, postcssPxtorem(postcssPlugins.pxtorem), postcssUrl(postcssPlugins.url)]
        },
        template: {
          isProduction: true
        }
      }),
      rollupResolve(),
      /**
       * babel插件必须放在commonjs之前，否则commonjs使用的acorn引擎无法识别一些特殊语法而报错，如jsx
       * https://github.com/rollup/rollup/issues/1148
       */
      rollupBabel({
        runtimeHelpers: true,
        extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.vue'],
        include: `${srcDirName}/**` // 只编译我们的源代码
      }),
      /**
       * commonjs和es6语法不能同时存在，否则会被认为非commonjs模块，从而忽略掉不做转换
       * https://github.com/rollup/rollup-plugin-commonjs/issues/273
       */
      rollupCommonjs(),
      rollupUrl({
        limit: Number.MAX_VALUE, // 所有图片都内嵌，否则用户使用时还需要针对图片配置loader才能引用
        // 支持'**/*.{jpg|jpeg|png|gif|svg|bmp}'形式
        include: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.gif', '**/*.svg', '**/*.bmp']
      })
    ],
    external (id) { // 不处理部分import
      // assets/image目录下的图片是公共图片，作为外部依赖
      if (/\.(jpg|jpeg|png|gif|svg|bmp)$/.test(id) && id.includes('../assets/image/')) {
        return true
      }

      return id !== file && !/\.(jpg|jpeg|png|gif|svg|bmp)$/.test(id) && !id.includes('?rollup-plugin-vue=')
    }
  })

  // 生成代码
  await bundle.write({
    format: 'esm',
    file: path.join(__dirname, libDirName, relative + '.js'),
    paths (id) { // 将import中的.vue替换成.js
      if (/^(\w|@)/.test(id)) { // npm库
        return id
      } else {
        id = id.replace(/\.(vue|jpg|jpeg|png|gif|svg|bmp)$/, '')
        if (path.isAbsolute(id)) { // 绝对路径
          const relative = path.relative(path.dirname(file), id)

          return relative.startsWith('.') ? relative : './' + relative
        } else { // 相对路径
          return id.startsWith('.') ? id : './' + relative
        }
      }
    }
  })
}

function deleteLib (cb) {
  fse.removeSync(path.join(__dirname, libDirName))
  cb()
}

// 处理less文件
function compileStyle (cb) {
  gulp.src([`${srcDirName}/**/*.less`, `!${srcDirName}/assets/**`])
    .pipe(gulpLess({
      rewriteUrls: 'all', // url路径相对被引入的less而不相对entry less
      plugins: [
        new LessAutoPrefix(),
        new LessCleanCSS()
      ]
    }))
    .pipe(gulpPxtorem(postcssPlugins.pxtorem))
    .pipe(gulpBase64({ // 将url文件转成base64
      maxImageSize: Number.MAX_VALUE
    }))
    .pipe(gulpRename({
      extname: '.js'
    }))
    .pipe(gulpModifyFile((content, pt) => {
      // 是不是icon组件
      const isIcon = path.dirname(pt) === path.resolve(src, 'components/icon/style')

      // 使用tools/add-style来添加样式
      return `
import addStyle from '${path.relative(path.dirname(pt), path.join(src, 'tools/add-style/index.js'))}'
${!isIcon ? '' : `import addIcon from './${path.basename(pt, '.js')}-icon.js'`}

${!isIcon ? '' : 'addIcon()'}
addStyle('${content.replace(/([\\'"])/g, '\\$1')}')
      `
    }))
    .pipe(gulp.dest(`${libDirName}`))
    .on('end', function () {
      cb()
    })
}

// 处理icon
function compileIcon (cb) {
  const styleDir = `${src}/components/icon/style`
  const promises = []

  // 生成各皮肤的svg symbol
  klaw(styleDir, {
    depthLimit: 0, // 只遍历一层
    filter (path) {
      return fs.statSync(path).isDirectory()
    }
  }).on('data', function ({ path: pt }) {
    // 忽略styleDir
    if (pt === styleDir) {
      return
    }

    promises.push(new Promise(function (resolve) {
      gulp.src(`${pt}/**/*.svg`)
        .pipe(gulpSvgSymbols({
          templates: ['default-svg'],
          svgAttrs: {
            class: `${libName}-icon-svg-symbols`,
            'aria-hidden': 'true'
          },
          slug (name) {
            return `${libName}-icon-${name}`
          }
        }))
        .pipe(gulpRename({
          basename: path.basename(pt),
          suffix: '-icon',
          extname: '.js'
        }))
        .pipe(gulpModifyFile((content) => {
          // 转义\、'，去掉注释、title、desc标签
          content = content.replace(/([\\'])/g, '\\$1').replace(/\n/g, '\\\n').replace(/\s*(?:<!--[\s\S]*?-->|<(title|desc)>[\s\S]*?<\/\1>)\s*/g, '')

          // 使用tools/add-html来添加svg
          return `
import addHtml from '${path.relative(path.dirname(pt), path.join(src, 'tools/add-html/index.js'))}'

export default function () {
  addHtml('${content}')
}
      `
        }))
        .pipe(gulp.dest(`${libDirName}/components/icon/style`))
        .on('end', function () {
          resolve()
        })
    }))
  }).on('end', function () {
    Promise.all(promises).then(function () {
      cb()
    })
  })
}

// 拷贝js目录
function copyAssetsJs (cb) {
  gulp.src(`${srcDirName}/assets/js/**`)
    .pipe(gulp.dest(`${libDirName}/assets/js`))
    .on('end', function () {
      cb()
    })
}

// 处理assets/image目录
function compileAssetsImage (cb) {
  gulp.src(`${srcDirName}/assets/image/**/*.*`)
    .pipe(gulpBase64Img())
    .pipe(gulpModifyFile(content => {
      return `export default '${content}'`
    }))
    .pipe(gulpRename({
      extname: '.js'
    }))
    .pipe(gulp.dest(`${libDirName}/assets/image`))
    .on('end', function () {
      cb()
    })
}

// 处理js、vue文件
function compileModule (cb) {
  let total = 0
  let completed = 0

  gulp.src([`${srcDirName}/**/*.{js,vue}`, `!${srcDirName}/assets/js/**`])
    .on('data', async function ({ path }) {
      total++
      await compile(path)
      completed++
      completed === total && cb()
    })
}

exports.default = gulp.parallel(
  gulp.series(
    deleteLib,
    gulp.parallel(
      compileStyle,
      compileIcon,
      copyAssetsJs,
      compileAssetsImage,
      compileModule
    )
  ),
  gulp.series(
    deleteDist,
    gulp.parallel(
      gulp.series(createDistJs, createDistMinJs),
      gulp.series(createDistCss, createDistMinCss)
      // TODO: 处理icon
    )
  )
)
exports.watch = function (cb) {
  const watchConfig = {
    delay: 500,
    ignoreInitial: false
  }

  // 构建lib
  gulp.watch(`${srcDirName}/**/*.less`, watchConfig, compileStyle)
  gulp.watch(`${srcDirName}/components/icon/**/*.svg`, watchConfig, compileIcon)
  gulp.watch(`${srcDirName}/assets/js/**`, watchConfig, copyAssetsJs)
  gulp.watch(`${srcDirName}/assets/image/**`, watchConfig, compileAssetsImage)
  gulp.watch([`${srcDirName}/**/*.{js,vue}`, `!${srcDirName}/assets/js/**`], watchConfig, compileModule)
  // 构建dist
  gulp.watch(`${srcDirName}/**/*.less`, watchConfig, gulp.series(createDistCss, createDistMinCss))
  gulp.watch(`${srcDirName}/**/*.{js,vue}`, watchConfig, gulp.series(createDistJs, createDistMinJs))
  cb()
}
