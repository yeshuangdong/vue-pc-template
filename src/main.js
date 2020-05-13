import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/less/common.less'
// 引入过滤器
import './filters'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 浏览器默认样式重置
import 'normalize.css/normalize.css'
// 调用接口封装
import api from '@/service'

// mock 数据
if (process.env.VUE_APP_MOCK === 'yes') require('@/service/mock')

Vue.config.productionTip = false
// 将调用接口的函数扩展到每个组件中
Vue.prototype.$http = api

Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
