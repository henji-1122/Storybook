import wxcForm from '../'
import wxcFormItem from '../../formItem'
import wxcInput from '../../input'
import wxcButton from '../../button'

export default {
  title: 'wxcForm',
  component: wxcForm
}

// story
export const Login = () => ({
  components: {wxcForm, wxcFormItem, wxcInput, wxcButton},
  template: `
    <wxcForm calss="form" ref="form" :model="user" :rules="rules">
      <wxcFormItem label="用户名" prop="username">
        <wxcInput :value="user.username" @input="user.username=$event" placeholder="请输入用户名"></wxcInput>
      </wxcFormItem>
      <wxcFormItem label="密码" prop="password">
        <wxcInput type="password" v-model="user.password"></wxcInput>
      </wxcFormItem>
      <wxcFormItem>
        <wxcButton type="primary" @click="login"> 登录 </wxcButton>
      </wxcFormItem>
    </wxcForm>
  `,
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码'
          },
          {
            min: 6,
            max: 12,
            message: '请输入6-12位密码'
          }
        ]
      }
    }
  },
  methods: {
    login () {
      // console.log('button')
      // return false
      this.$refs.form.validate(valid => {  
        if (valid) {
          alert('验证成功')
        } else {
          alert('验证失败')
          return false
        }
      })
    }
  }
})