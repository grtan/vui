const gulp = require('gulp')
const gulpModifyFile = require('gulp-modify-file')
const gulpRename = require('gulp-rename')
const gulpLess = require('gulp-less')
const gulpBase64 = require('gulp-base64')
const gulpBase64Img = require('gulp-base64-img')
const lessAutoPrefix = require('less-plugin-autoprefix')
const lessCleanCSS = require('less-plugin-clean-css')
const rollup = require('rollup')
const rollupResolve = require('rollup-plugin-node-resolve')
const rollupCommonjs = require('rollup-plugin-commonjs')
const rollupUrl = require('rollup-plugin-url')
const rollupBabel = require('rollup-plugin-babel')
// const rollupUglify = require('rollup-plugin-uglify')
const rollupVue = require('rollup-plugin-vue')
const autoprefixer = require('autoprefixer')
// const modernizr = require('modernizr')
const path = require('path')
const through2 = require('through2')
// const chokidar = require('chokidar')
const file = 'src/vendor/modernizr/modernizr.js'
const src = path.join(__dirname, 'src') // src目录路径
const lib = 'lib' // lib目录名
let k = 0

//创建临时的自定义modernizr文件
// modernizr.build({
//   // minify: true,
//   options: [
//     'prefixed'
//   ]
// }, function (result) {
//   writeFile(file, result)
// })

// function build (format, minify) {
//   k++
//   rollup.rollup({
//     input: 'src/index.js',
//     plugins: [
//       resolve(),
//       commonjs(),
//       postcss({}),
//       url({
//         limit: 100 * 1024
//       }),
//       vue({
//         css: true,
//         cssModules: {
//           generateScopedName: '[path][name]--[local]--[hash:base64:5]'
//         },
//         // css(content, styles) {
//         //     styles.forEach(({id, code}) => {
//         //         console.log(id, '----------', code);
//         //
//         //         // const filename = id.replace(/^.*\/([^\/]*)\/[^\/]*$/, '$1');
//         //         //
//         //         // fs.writeFileSync(`dist/css/${filename}.js`, function () {
//         //         //     return `export default function() {
//         //         //             styleInject('${code.replace(/\s+/gm, ' ').replace(/'/g, '\\\'')}');
//         //         //         };`;
//         //         // }());
//         //     });
//         // },
//         postcss: [autoprefixer(require('./postcss.config').plugins.autoprefixer)]
//       }),
//       babel({
//         runtimeHelpers: true,
//         include: 'src/**'   // 只编译我们的源代码
//       })
//     ].concat(minify ? uglify() : [])
//   }).then(function (bundle) {
//     bundle.write(Object.assign({
//       file: `dist/lib${format === 'es' ? '.esm' : ''}${minify ? '.min' : ''}.js`,
//       format: format
//     }, format === 'es' ? {} : {
//       name: 'VUI'
//     })).then(function () {
//       //所有任务执行完后删除临时文件
//       // !(--k) && fs.unlinkSync(file);
//     })
//   })
// }

// build('es');
// build('umd');
// build('es', true);
// build('umd', true);

/**
 * 编译js、vue文件
 * @param file  文件绝对路径
 */
async function compile (file) {
  //获取file相对src目录的路径
  const relative = path.relative(src, path.join(path.dirname(file), path.basename(file, path.extname(file))))

  // rollup.watch({
  //   input: file,
  //   plugins: [
  //     rollupResolve(),
  //     rollupCommonjs(),
  //     rollupVue({
  //       style: {
  //         postcssPlugins: [autoprefixer(require('./postcss.config').plugins.autoprefixer), postcssClean()]
  //       },
  //       template: {
  //         isProduction: true
  //       }
  //     }),
  //     rollupUrl({
  //       limit: Number.MAX_VALUE, // 所有图片都内嵌，否则用户使用时还需要针对图片配置loader才能引用
  //       include: '**/*.{jpg|jpeg|png|gif|svg|bmp}'
  //     }),
  //     rollupBabel({
  //       runtimeHelpers: true,
  //       include: 'src/**'   // 只编译我们的源代码
  //     })
  //   ],
  //   external(id) {  //外部依赖模块，不需要处理import
  //     return id !== file && !/\.(jpg|jpeg|png|gif|svg|bmp)$/.test(id) && !id.includes('?rollup-plugin-vue=')
  //   },
  //   output: [{
  //     format: 'esm',
  //     file: path.join(__dirname, lib, relative + '.js'),
  //     paths (id) {     //将import中的.vue替换成.js
  //       console.log('id------', id)
  //
  //       if (/^\w/.test(id)) {   //npm库
  //         return id
  //       } else {
  //         id = id.replace(/\.vue$/, '')
  //         if (path.isAbsolute(id)) {   //绝对路径
  //           let relative = path.relative(path.dirname(file), id)
  //
  //           return relative.startsWith('.') ? relative : './' + relative
  //         } else {  //相对路径
  //           return id.startsWith('.') ? id : './' + relative
  //         }
  //       }
  //     }
  //   }],
  //   watch: {
  //     chokidar,
  //     include: 'src/**'
  //   }
  // })

  const bundle = await rollup.rollup({
    input: file,
    plugins: [
      rollupVue({
        defaultLang: {
          style: 'less'
        },
        style: {
          postcssPlugins: [autoprefixer(require('./postcss.config').plugins.autoprefixer)]
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
        include: 'src/**'   // 只编译我们的源代码
      }),
      /**
       * commonjs和es6语法不能同时存在，否则会被认为非commonjs模块，从而忽略掉不做转换
       * https://github.com/rollup/rollup-plugin-commonjs/issues/273
       */
      rollupCommonjs(),
      rollupUrl({
        limit: Number.MAX_VALUE, // 所有图片都内嵌，否则用户使用时还需要针对图片配置loader才能引用
        // 不支持'**/*.{jpg|jpeg|png|gif|svg|bmp}'形式
        include: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.gif', '**/*.svg', '**/*.bmp']
      })
    ],
    external(id) {  //不处理部分import
      // assets/image目录下的图片是公共图片，作为外部依赖
      if (/\.(jpg|jpeg|png|gif|svg|bmp)$/.test(id) && id.includes('../assets/image/')) {
        return true
      }

      return id !== file && !/\.(jpg|jpeg|png|gif|svg|bmp)$/.test(id) && !id.includes('?rollup-plugin-vue=')
    }
  })

  //生成代码
  await bundle.write({
    format: 'esm',
    file: path.join(__dirname, lib, relative + '.js'),
    paths (id) {     //将import中的.vue替换成.js
      if (/^(\w|@)/.test(id)) {   //npm库
        return id
      } else {
        id = id.replace(/\.(vue|jpg|jpeg|png|gif|svg|bmp)$/, '')
        if (path.isAbsolute(id)) {   //绝对路径
          let relative = path.relative(path.dirname(file), id)

          return relative.startsWith('.') ? relative : './' + relative
        } else {  //相对路径
          return id.startsWith('.') ? id : './' + relative
        }
      }
    }
  })
}

const watchConfig = {
  delay: 1000
}

// 拷贝js目录
function copyJs (cb) {
  gulp.src('src/assets/js/**')
    .pipe(gulp.dest('lib/assets/js'))
    .on('end', function () {
      cb()
    })
}
gulp.watch('src/assets/js/**', watchConfig, copyJs)

// 处理assets/image目录
function compileImage (cb) {
  gulp.src('src/assets/image/**/*.*')
    .pipe(gulpBase64Img())
    .pipe(gulpModifyFile(content => {
      return `export default '${content}'`
    }))
    .pipe(gulpRename({
      extname: '.js'
    }))
    .pipe(gulp.dest('lib/assets/image'))
    .on('end', function () {
      cb()
    })
}
gulp.watch('src/assets/image/**', watchConfig, compileImage)

// 处理js、vue文件
function compileVueJs (cb) {
  gulp.src(['src/**/*.{js,vue}', '!src/assets/js/**'])
    .on('data', async function ({path}) {
      await compile(path)
    })
    .on('end', function () {
      cb()
    })
}
gulp.watch(['src/**/*.{js,vue}', '!src/assets/js/**'], watchConfig, compileVueJs)

// 处理less文件
function compileStyle (cb) {
  gulp.src('src/components/**/*.less')
    .pipe(gulpLess({
      rewriteUrls: 'all', // url路径相对被引入的less而不相对entry less
      plugins: [
        new lessAutoPrefix(require('./postcss.config').plugins.autoprefixer),
        new lessCleanCSS()
      ]
    }))
    .pipe(gulpBase64({  // 将url文件转成base64
      maxImageSize: Number.MAX_VALUE
    }))
    .pipe(gulpModifyFile((content, pt) => {
      // 使用tools/add-style来添加样式
      return `import addStyle from '${path.relative(path.dirname(pt), path.join(src, 'tools/add-style/index'))}'\n\naddStyle('${content}')`
    }))
    .pipe(gulpRename({
      extname: '.js'
    }))
    .pipe(gulp.dest('lib/components'))
    .on('end', function () {
      cb()
    })
}
gulp.watch('src/**/*.less', watchConfig, compileStyle)

exports.default = gulp.parallel(copyJs, compileImage, compileVueJs, compileStyle)