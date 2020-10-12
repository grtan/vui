import path from 'path'
import glob from 'glob'
import alias from '@rollup/plugin-alias'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import babel from '@rollup/plugin-babel'
import vue from 'rollup-plugin-vue'
import { terser } from 'rollup-plugin-terser'
import del from 'rollup-plugin-delete'

const src = path.resolve(__dirname, `..${path.sep}src`)

export default [
  // 构建es模块
  {
    input: (() => {
      const entries = {}

      glob
        .sync('src/**/*.{vue,ts,tsx,js,jsx}', {
          ignore: ['src/**/*.d.ts']
        })
        .forEach(pt => {
          entries[pt.replace(/^src\/|\.[^./]*$/g, '')] = pt
        })

      return entries
    })(),
    output: {
      dir: 'lib',
      format: 'es'
    },
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
    external(id, parentId) {
      /**
       * input文件本身、@/开头、后缀名为.vue、vue处理后的模块不能外置
       * @/开头、后缀名为.vue的模块的路径经过alias插件处理后，alias插件又会调用this.resolve方法，最终又会调用该external判断，从而外置模块
       */
      if (!parentId || id.startsWith('@/') || id.endsWith('.vue') || /\?rollup-plugin-vue=/.test(id)) {
        return false
      }

      return true
    },
    plugins: [
      alias({
        /**
         * 默认是一个一个规则来顺序替换
         * 前面匹配的规则替换后，如果替换后的路径被external外置了，就不会执行后续的替换了
         */
        entries: [
          {
            find: /^(.*)\.vue$/,
            replacement: '$1.js'
          },
          {
            find: /^@(\/.*)/,
            replacement: `${src}$1`
          }
        ]
      }),
      // 必须放在babel前，否则babel处理后会添加import bael-helper语句，导致该插件无法识别代码为commonjs模块
      commonjs(),
      typescript(),
      babel({
        // 必须包括ts文件，否则不会对ts进行转码
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        // 外置helper方法
        babelHelpers: 'runtime'
      }),
      vue({
        defaultLang: {
          style: 'scss',
          script: 'ts'
        }
      }),
      del({
        targets: 'lib/*'
      })
    ]
  }
  // 构建umd模块
  // {
  //   input: 'src/index.ts',
  //   output: [
  //     {
  //       dir: 'dist',
  //       entryFileNames: 'vui.js',
  //       format: 'umd',
  //       name: 'VUI'
  //     },
  //     {
  //       dir: 'dist',
  //       entryFileNames: 'vui.min.js',
  //       format: 'umd',
  //       name: 'VUI',
  //       compact: true,
  //       plugins: [terser()]
  //     }
  //   ],
  //   plugins: [
  //     alias({
  //       entries: {
  //         '@': src
  //       }
  //     }),
  //     nodeResolve({
  //       extensions: ['.vue', '.ts', '.tsx', '.js', '.jsx']
  //     }),
  //     commonjs(),
  //     typescript(),
  //     babel({
  //       extensions: ['.ts', '.tsx', '.js', '.jsx'],
  //       exclude: 'node_modules/**',
  //       babelHelpers: 'runtime'
  //     }),
  //     vue({
  //       defaultLang: {
  //         style: 'scss',
  //         script: 'ts'
  //       }
  //     }),
  //     del({
  //       targets: 'dist/*'
  //     })
  //   ]
  // }
]
