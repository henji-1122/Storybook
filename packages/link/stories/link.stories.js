import wxcLink from '../src/link.vue'

export default {
  title: 'wxcLink',
  component: wxcLink
}

export const Link = _ => ({
  components: { wxcLink },
  template: `
    <div>
      <wxc-link :disabled="true" href="http://www.baidu.com">baidu</wxc-link>
    </div>
  `
})