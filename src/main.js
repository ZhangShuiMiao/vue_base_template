import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/index.less'
import './icon'
import './permission'
import * as filters from './filters'
import ElementUI from 'element-ui'
//     动态cdn引入 无需引入css 
// *** delete ***  import 'element-ui/lib/theme-chalk/index.css'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// 开发环境打包element vue相关包(正常引入使用)  生产环境已排除并动态cdn注入
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
