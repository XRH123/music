import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import LoadLazy from 'vue-lazyload'
import defaultImg from '@/assets/images/indexLogo.png'

Vue.config.productionTip = false

Vue.use(LoadLazy,{
    preLoad: 1.3,
    loading:defaultImg
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
