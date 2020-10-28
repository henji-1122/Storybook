// 组件打包入口文件
// 使用组件并将其导出
import wxcFormItem from './src/formItem.vue'

// 定义install的方法，后期别人使用时通过Vue.use()方式引入此包
wxcFormItem.install = Vue => {
  // 全局注册组件
  Vue.component(wxcFormItem.name, wxcFormItem) // Button.name:通过组件的名字来获取此组件
}

export default wxcFormItem