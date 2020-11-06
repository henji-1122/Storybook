// 先导入input组件
import input from '../src/input.vue'
// 引入vue test utils 使用里面的API挂载组件
import { mount } from '@vue/test-utils'
import { TestScheduler } from 'jest'
// Jest不用导入，因为测试文件是被jest加载执行的

// 通过describe创建一个代码块，将input的相关测试都放在这个代码块中
describe('wxc-input', () => { // 代码块中写测试函数
  // 测试input生成的是否是希望的文本框
  test('input-text', () => {
    // mount挂载组件(只是在内存中挂载)
    const wrapper = mount(input)
    // 判断组件生成的html中是否包含type=text
    expect(wrapper.html()).toContain('input type="text"')
  })

  // 测试生成的密码框是否正确
  test('input-password', () => {
    const wrapper = mount(input,{
      propsData: {
        type: 'password'
      }
    })
    expect(wrapper.html()).toContain('input type="password"')
  })

  // 对组件测试时经常要对组件的状态，也就是组件对外公布的数据或方法进行测试
  // 所以下面对value进行测试
  test('input-password', () => {
    const wrapper = mount(input,{
      propsData: {
        type: 'password',
        value: 'admin'
      }
    })
    // 判断生成的组件props对象的value属性值是否是admin
    expect(wrapper.props('value')).toBe('admin')
  })

  // 测试快照，快照是jest中提供的一个方法
  test('input-snapshot', () => {
    const wrapper = mount(input,{
      propsData: {
        type: 'password',
        value: 'admin'
      }
    })
    // 把挂载的组件对应的DOM对象拍一个快照，第一次调用会把expect的值以字符串的方式存储到文本文件中
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})

