// 组件打包入口文件
// 使用组件并将其导出
import wxcForm from './src/form.vue'

// 定义install的方法，后期别人使用时通过Vue.use()方式引入此包
wxcForm.install = Vue => {
  // 全局注册组件
  Vue.component(wxcForm.name, wxcForm) // Button.name:通过组件的名字来获取此组件
}

export default wxcForm