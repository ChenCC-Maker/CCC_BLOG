import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import iView from 'iview'
import 'iview/dist/styles/iview.css';
import router from './router/Index'
import VueEasytable from 'vue-easytable'
import "vue-easytable/libs/theme-default/index.css"
import { veLoading } from 'vue-easytable'

Vue.use(VueRouter)
Vue.use(iView)
Vue.use(VueEasytable)

Vue.prototype.$veLoading = veLoading
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
