<template>
  <div>
    <button @click="handleClick"><slot></slot></button>
  </div>
</template>

<script>
export default {
  name: 'wxcButton',
  methods: {
    handleClick (event) {
      this.$emit('click', event)
      event.preventDefault(); // 组织form表单的自动提交事件
    }
  }
}
</script>

<style>

</style>