import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css' //引用bootstrap的样式
import 'bootstrap/dist/js/bootstrap.min.js' //引用bootstrap的js
import ElementUI from 'element-ui';                      // 引入element-ui
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'
//需要挂载到Vue原型上

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.use(ElementUI);   // 这种方式引入了ElementUI中所有的组件

Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router:router,
  beforeCreate(){
    Vue.prototype.$bus = this
  }
}).$mount('#app')
