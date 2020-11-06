import { terser } from 'rollup-plugin-terser'
import vue from 'rollup-plugin-vue'  // 将vue单文件组件编译成js代码

module.exports = [
  {
    input: 'index.js',
    output: [
      {
        file: 'dist/index.js',
        format: 'es'  // 配置模块化的打包方式(es/cjs)
      }
    ],
    plugins: [
      vue({ // vue插件
        css: true, //将单文件组件内的css样式插入到HTML中的style中
        compileTemplate: true // 把组件转换成render函数
      }),
      terser() // 对代码进行压缩
    ]
  }
]