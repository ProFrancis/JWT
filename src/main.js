import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import Vuelidate from 'vuelidate'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import './assets/style.css'
import './assets/styles.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Vuelidate)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')