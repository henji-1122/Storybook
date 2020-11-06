import wxcLink from './src/link.vue'

wxcLink.install = Vue => {
  Vue.component(wxcLink.name, wxcLink)
}

export default wxcLink
