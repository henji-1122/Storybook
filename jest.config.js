module.exports = {
  "testMatch": ["**/__tests__/**/*.[jt]s?(x)"],  // 去哪里找测试文件
  "moduleFileExtensions": [ // 测试文件中导入的文件后缀
    "js",
    "json",
    // 告诉jest处理"*.vue"文件
    "vue"
  ],
  "transform": {
    // 用'vue-jest'处理'*.vue'文件
    ".*\\.(vue)$": "vue-jest",
    // 用babel-jest处理js
    ".*\\.(js)$": "babel-jest"
  }
}