import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import VueResource from 'vue-resource'
import VModal from 'vue-js-modal'
import VueCryptojs from 'vue-cryptojs'

Vue.use(VueCryptojs)  // Encryption
Vue.use(VueResource)  // http requests
Vue.use(VModal)


Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
