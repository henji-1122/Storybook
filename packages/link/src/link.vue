<template>
  <a 
  :href="disabled ? null : href"
  :class="[disabled && 'disabled', !underline && 'no-underline']">
  <slot></slot>
  </a>
</template>

<script>
export default {
  name: 'wxcLink',  // 组件的名称，规则的：wxc开头 + 创建组件时输入的名字，使用了模板提供的properCase将首字母大写
  props: {
    href: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    underline: {
      type: Boolean,
      default: false
    }

  }
}
</script>

<style scoped>
.disabled{
  cursor: not-allowed;
}
.no-underline {
  text-decoration: none;
}
</style>
