import Vue from 'vue'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import VConsole from 'vconsole'

import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/index.scss'

fastclick.attach(document.body)
const vConsole = new VConsole()
Vue.config.productionTip = false
Vue.use(VueLazyload, {
  loading: require('./assets/images/loading.gif')
})
Vue.use(vConsole)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
