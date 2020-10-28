import wxcInput from '../'  // 只需要写../，因为导入的是外层index.js，而index.js中导出了这个组件

export default { // 导出stories对应的对象
  title: 'wxcInput',
  component: wxcInput
}

// 第1个story:文本框
export const Text = () => ({  // 返回的是一个对象(这个对象就是组件)，外面用()包裹，否则会将其视为函数的代码块执行
  components: { wxcInput }, // 注册所依赖的组件，局部注册组件
  template: '<input v-model="value"></input>', // 设置模板
  data () { // 绑定数据
    return {
      value: 'admin'
    }
  }
})

// 第2个story:密码框
export const Password = () => ({
  components: { wxcInput }, 
  template: '<input v-model="value" type="password"></input>', 
  data () { 
    return {
      value: 'admin'
    }
  }
})



