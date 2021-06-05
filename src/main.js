import Vue from 'vue'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import VConsole from 'vconsole'
import MetaInfo from 'vue-meta-info'

import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/index.scss'
import Loading from './plugins/loading'

fastclick.attach(document.body)
const vConsole = new VConsole()
Vue.config.productionTip = false
Vue.use(VueLazyload, {
  loading: require('./assets/images/loading.gif')
})
Vue.use(Loading)
Vue.use(vConsole, { title: '加载中...' })
Vue.use(MetaInfo)

new Vue({
  router,
  store,
  render: h => h(App),
  mounted: () => document.dispatchEvent(new Event('x-app-rendered'))
}).$mount('#app')
