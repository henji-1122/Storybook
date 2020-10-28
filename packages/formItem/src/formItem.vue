<template>
  <div>
    <label>{{label}}</label>
    <div>
      <slot></slot>
      <p v-if="errMessage">{{errMessage}}</p> 
    </div>
  </div>
</template>

<script>
import asyncValidator from 'async-validator'
export default {
  name: 'wxcFormItem',
  inject: ['form'],
  props: {
    label: {
      type: String
    },
    prop: { // 验证表单必须要有prop属性
      type: String
    }
  },
  data() {
    return {
      errMessage: ''
    }
  },
  mounted () {
    this.$on('validate', () => {
      this.validate()
    })
  },
  methods: {
    // 表单项验证方法
    validate () { 
      // 首先判断当前表单是否需要验证，因为有prop属性才验证
      if(!this.prop) return
      // 先要获取需要验证的数据和规则
      const value = this.form.model[this.prop] //prop是传过来要验证的属性名，根据名字拿到数据
      const rules = this.form.rules[this.prop] // 根据属性名获取验证规则

      // 使用async-validator模块进行验证
      // 验证的属性名及验证的对应对象
      const descriptor = {
         [this.prop]: rules  // 对象的属性就是传过来的prop的值，把变量作为属性需要加[]
      } 
      const validator = new asyncValidator(descriptor)
      // 调用validator的validate方法进行验证，他返回的是promise
      return validator.validate({[this.prop]: value}, errors => {
        if(errors){ // 如果验证失败
          this.errMessage = errors[0].message
        } else {
          this.errMessage = ''
        }
      })
    }
  }
}
</script>

<style>

</style>