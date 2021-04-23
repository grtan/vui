import path from 'path'
import glob from 'glob'
import fse from 'fs-extra'
import alias from '@rollup/plugin-alias'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import typescript from 'rollup-plugin-typescript2'
import babel from '@rollup/plugin-babel'
import vue from 'rollup-plugin-vue'
import { terser } from 'rollup-plugin-terser'
import del from 'rollup-plugin-delete'
import SVGSpriter from 'svg-sprite'
import artTemplate from 'art-template'

// 处理图标，获取生成的svg sprite内容
async function getIconSvgSprite() {
  const spriter = new SVGSpriter({
    shape: {
      id: {
        generator: 'vui-icon-'
      },
      transform: [
        {
          svgo: {
            plugins: [
              {
                removeXMLNS: true
              }
            ]
          }
        }
      ]
    },
    svg: {
      rootAttributes: {
        class: 'vui-icon__symbols'
      }
    },
    mode: {
      symbol: {
        inline: true
      }
    }
  })

  glob.sync(path.resolve(__dirname, '../src/modules/icon/image/*.svg')).forEach(pt => {
    spriter.add(
      pt,
      null,
      fse.readFileSync(pt, {
        encoding: 'utf-8'
      })
    )
  })

  return new Promise(resolve => {
    // eslint-disable-next-line node/handle-callback-err
    spriter.compile(function (error, result) {
      for (const mode in result) {
        // eslint-disable-next-line no-unreachable-loop
        for (const resource in result[mode]) {
          resolve(result[mode][resource].contents)
          return
        }
      }
    })
  })
}

const src = path.resolve(__dirname, '../src')
const extensions = ['.vue', '.ts', '.tsx', '.js', '.jsx', '.mjs']
const modify = {
  name: 'modify',
  async transform(code, id) {
    // 往icon组件中注入添加svg sprite的代码
    if (/\/icon\/component.vue\?rollup-plugin-vue=/.test(id)) {
      const svg = await getIconSvgSprite()

      return `${code}\n\n${artTemplate(path.resolve(__dirname, '../src/modules/icon/inject.art'), {
        svg
      })}`
    }
  }
}

// 同时构建es、umd会有bug，目前不清楚原因，暂时先分开构建
export default args => {
  if (args.format === 'es') {
    delete args.format

    // 构建es模块
    return {
      input: (() => {
        const entries = {}

        glob
          .sync('src/**/*.{vue,ts,tsx,js,jsx,mjs}', {
            ignore: ['src/**/demo/**', 'src/**/*.d.ts']
          })
          .forEach(pt => {
            // 这里保留后缀名，因为同一个目录下可能同时存在index.js index.mjs之类的情况
            entries[pt.replace(/^src\//, '')] = pt
          })

        return entries
      })(),
      output: {
        dir: 'lib',
        format: 'es',
        entryFileNames(chunk) {
          /**
           * 将生成文件后缀名改成js
           * 这里特意保留.mjs后缀名，因为代码中可能导入packages中第三方依赖包的.mjs文件
           */
          return chunk.name.replace(/\.(vue|ts|tsx|jsx)$/, '.js')
        }
      },
      plugins: [
        /**
         * 插件默认过滤了input入口文件本身，且使用第一个匹配的规则进行替换
         * 如果定义了customResolver，则优先返回customResolver.call(this, updatedId, importerId, {})的结果
         * 否则再执行this.resolve(updatedId, importer, { skipSelf: true })，如果返回结果不为null，则以该结果作为返回值，否则以updatedId作为返回值
         * 因为用了skipSelf:true，所以每个替换都要单独用一个插件实例，否则无法进行多次替换
         * 该插件替换后的模块路径不再经过其他插件的resolveId进行处理，如果返回的模块未external，则还会再通过rollup的external方法判断是否需要外置
         */
        alias({
          entries: [
            {
              find: /^@(?=\/|$)/,
              replacement: src
            }
          ]
        }),
        alias({
          entries: [
            {
              find: /^(.*)\.vue$/,
              replacement: '$1'
            }
          ]
        }),
        /**
         * 外置相对路径模块时要特别注意，官方解释 https://rollupjs.org/guide/en/#external
         * The conversion back to a relative import is done as if output.file or output.dir were in the same location as
         * the entry point or the common base directory of all entry points if there is more than one.
         *
         * 意思就是，构建后的相对路径为：被导入的相对路径的模块定位成本来的绝对路径，然后把output.dir/file当作所有入口文件的共同祖先目录，各个入口再用相对路径定位到引入的模块
         *
         * 假设配置如下
         * {
         *    input: {
         *        "component/dialog/index": "xxx/sr/component/dialog/index.vue",
         *        "component/dialog/util/test": "xxx/sr/component/dialog/util/test.ts"
         *    },
         *    output: {
         *        entryFileNames: "[name].js"
         *        format: 'es'
         *    }
         * }
         * sr/component/dialog/index.vue中：import { test } from './util/test'
         *
         * 则共同祖先目录为sr/component/dialog
         * 外置相对路径模块时，把output.dir/file当作所有入口文件的共同祖先目录sr/component/dialog，
         * 那么index.vue构建后的文件路径为sr/component/dialog/component/dialog/index.js
         * 其定位到test模块的相对路径为 ../../util/test
         * 所以构建后的index.vue文件中test模块的相对路径为  import { test } from '../../util/test'
         */
        alias({
          entries: [
            {
              find: /^.*$/,
              replacement: '$&',
              // 与resolveId钩子的写法一致
              customResolver(importee, importer) {
                // vue插件生成的模块，给后续插件处理
                if (/\?rollup-plugin-vue=/.test(importee)) {
                  return null
                }

                /**
                 * 外置已经存在的模块路径时会报错，因为input中使用的都是绝对路径，所以在这里将路径替换成相对路径
                 */
                return {
                  id: path.isAbsolute(importee)
                    ? path.relative(path.dirname(importer), importee).replace(/^(?!\.)/, './')
                    : importee,
                  external: true
                }
              }
            }
          ]
        }),
        vue(),
        typescript({
          typescript: require('ttypescript'),
          tsconfigOverride: {
            compilerOptions: {
              plugins: [
                // 替换生成的.d.ts中的@符号
                {
                  transform: 'typescript-transform-paths',
                  afterDeclarations: true
                }
              ]
            }
          }
        }),
        // 修改图标组件代码
        modify,
        // 必须放在babel前，否则babel处理后会添加import bael-helper语句，导致该插件无法识别代码为commonjs模块
        commonjs({
          extensions: ['.js', '.jsx']
        }),
        babel({
          /**
           * 必须包括ts文件，否则不会对ts进行转码
           * rollup-plugin-vue插件解析vue文件时，会自动插入一些辅助代码，但这些代码中包含const等es6语法
           * 所以需要添加.vue后缀支持，将辅助代码转换成es5
           * importee —— component.vue?rollup-plugin-vue=script.ts
           * importer —— /Users/vivo/Code/Project/vui/src/modules/button/component.vue
           * https://github.com/rollup/rollup-plugin-babel/issues/260
           */
          extensions,
          // 外置helper方法
          babelHelpers: 'runtime'
        }),
        del({
          targets: 'lib/*'
        }),
        // 构建完后复制types到lib目录
        {
          name: 'copy-types',
          writeBundle() {
            fse.copySync(path.resolve(__dirname, '../src/types'), path.resolve(__dirname, '../lib/types'))
          }
        }
      ]
    }
  }

  // 构建umd模块
  return {
    input: 'src/modules/index.ts',
    output: [
      {
        dir: 'dist',
        entryFileNames: 'vui.js',
        format: 'umd',
        exports: 'named',
        name: 'VUI',
        globals: {
          vue: 'Vue'
        }
      },
      {
        dir: 'dist',
        entryFileNames: 'vui.min.js',
        format: 'umd',
        exports: 'named',
        name: 'VUI',
        globals: {
          vue: 'Vue'
        },
        compact: true,
        plugins: [terser()]
      }
    ],
    external: ['vue'],
    plugins: [
      alias({
        entries: [
          {
            find: /^@(?=\/|$)/,
            replacement: src
          }
        ]
      }),
      nodeResolve({
        extensions
      }),
      vue(),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: false
          }
        }
      }),
      modify,
      commonjs({
        extensions: ['.js', '.jsx']
      }),
      babel({
        extensions,
        // 不排除npm包，防止有些npm包存在const等es6语法
        // exclude: 'node_modules/**',
        babelHelpers: 'runtime'
      }),
      replace({
        preventAssignment: true,
        values: {
          /**
           * dist目录中的代码通常通过script标签直接引入
           * 此时需要设置NODE_ENV为production，以便压缩工具可以删除掉一些开发环境的提示代码，缩小文件体积
           *
           * lib构建不需要进行该设置，因为lib目录中的代码通常与webpack等构建工具一起使用，
           * 既可以是开发环境也可以是生成环境，由使用方通过构建工具自行设置NODE_ENV
           */
          'process.env.NODE_ENV': JSON.stringify('production')
        }
      }),
      del({
        targets: 'dist/*.js'
      })
    ]
  }
}
