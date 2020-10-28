<template>
  <div>
    <input v-bind="$attrs" :type="type" :value="value" @input="handleInput">
  </div>
</template>

<script>
export default {
  name: 'wxcInput',
  inheritAttrs: false,
  props: {
    value: {
      type: String
    },
    type: {
      type: String,
      default: 'text'
    }
  },

  methods: {
    handleInput(event) {
      this.$emit('input', event.target.value)

      // 通知父组件 触发validate方法 进行验证
      // 循环找父组件方法
      const findParent = parent => {
        while(parent){
          // 如果父组件存在，还要判断是不是FormItem组件
          if(parent.$options.name === 'wxcFormItem') { // wxcFormItem:wxcFormItem的name
            break
          }else{
            parent = parent.$parent
          }
        }
        return parent
      }
      // 找到parent后触发父组件的validate事件
      const parent = findParent(this.$parent) // this.$parent:当前组件的父组件是否存在
      if(parent){
        parent.$emit('validate') //触发自定义事件
      }
    }
  }
}
</script>

<style>

</style>