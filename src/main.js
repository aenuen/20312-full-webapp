import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import filters from '@/libs/filters'
import directives from '@/libs/directives'

// vee-validate
import '@/libs/veevalidate'

// 样式
import 'normalize.css/normalize.css'
import '@/assets/styles/theme.scss'
import 'plugins-methods/css/supplement.scss'
import 'plugins-methods/css/flex.css'
import 'plugins-methods/css/mobile.css'

// 引用mint-ui组件
import '@/libs/mint-ui'
import '@/libs/allComponents'

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

Object.keys(directives).forEach((key) => {
  Vue.directive(key, directives[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
