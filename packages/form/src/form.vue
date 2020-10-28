<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'wxcForm', 
  provide () {
    return {
      form: this // 将form组件对象传递给formItem
    }
  },
  props: {
    model: {  //表单绑定的数据对象
      type: Object
    },
    rules: { //表单验证规则对象
      type: Object
    }
  },
  methods: {
    validate (cb) {
      // 找到所有的FormItem组件
      console.log("~~~~~",this.$children)
      const tasks = this.$children // tasks数组中存放的是所有FormItem中执行完validate()后返回的Promise对象
        .filter(child => child.prop) // 具有prop属性的FormItem组件才需要验证
        .map(child => child.validate())// 调用validate方法，最终返回的是promise 放在数据中

      // 判断是否promise都执行成功
      Promise.all(tasks)
        .then(()=>cb(true))
        .catch(()=>cb(false))
    }
  }

}
</script>

<style>

</style>