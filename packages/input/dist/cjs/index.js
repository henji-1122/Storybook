"use strict";function e(e,t,n,o,r,i,s,a,d,p){"boolean"!=typeof s&&(d=a,a=s,s=!1);const c="function"==typeof n?n.options:n;let u;if(e&&e.render&&(c.render=e.render,c.staticRenderFns=e.staticRenderFns,c._compiled=!0,r&&(c.functional=!0)),o&&(c._scopeId=o),i?(u=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),t&&t.call(this,d(e)),e&&e._registeredComponents&&e._registeredComponents.add(i)},c._ssrRegister=u):t&&(u=s?function(e){t.call(this,p(e,this.$root.$options.shadowRoot))}:function(e){t.call(this,a(e))}),u)if(c.functional){const e=c.render;c.render=function(t,n){return u.call(n),e(t,n)}}else{const e=c.beforeCreate;c.beforeCreate=e?[].concat(e,u):[u]}return n}const t=e({render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("input",e._b({attrs:{type:e.type},domProps:{value:e.value},on:{input:e.handleInput}},"input",e.$attrs,!1))])},staticRenderFns:[]},undefined,{name:"wxcInput",inheritAttrs:!1,props:{value:{type:String},type:{type:String,default:"text"}},methods:{handleInput(e){this.$emit("input",e.target.value);const t=(e=>{for(;e&&"wxcFormItem"!==e.$options.name;)e=e.$parent;return e})(this.$parent);t&&t.$emit("validate")}}},undefined,false,undefined,!1,void 0,void 0,void 0);t.install=e=>{e.component(t.name,t)},module.exports=t;
