import fs from 'fs'
import path from 'path'
import json from '@rollup/plugin-json'
import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'

// 如果是开发环境会开启代码的压缩
const isDev = process.env.NODE_ENV !== 'production'

// 公共插件配置
const plugins = [
  vue({
    // 将单文件组件内的css样式插入到HTML中的style中
    css: true,
    // 把组件转换成render函数
    compileTemplate: true
  }),
  json(),
  nodeResolve(),
  postcss({
    // 把 css 插入到 style 中
    // inject: true,
    // 把 css 放到和js同一目录
    extract: true
  })
]

// 如果是开发环境，开启压缩
isDev || plugins.push(terser())

// 获取packages 文件夹路径，作为处理的根路径
const root = path.resolve(__dirname, 'packages')

// 读取路径中的所有内容
module.exports = fs.readdirSync(root)
  // 过滤，只保留包的文件夹
  .filter(item => fs.statSync(path.resolve(root, item)).isDirectory())
  // 为每一个文件夹创建对应的配置
  .map(item => {
    const pkg = require(path.resolve(root, item, 'package.json'))
    return { // 每一个包对应的rollup的配置
      input: path.resolve(root, item, 'index.js'),
      output: [
        {
          exports: 'auto',
          file: path.resolve(root, item, pkg.main), //pkg中的main字段，记录了打包的路径
          format: 'cjs'
        },
        {
          exports: 'auto',
          file: path.join(root, item, pkg.module),//pkg中的module字段
          format: 'es'
        },
      ],
      plugins: plugins
    }
  })
  // map结束后返回一个数组，数组中的每一个对象都对应一个包的配置