// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import ApiService from '@/services/api.service'
import { TokenService } from '@/services/storage.service'


Vue.config.productionTip = false

// import global javascript
import '@/assets/plugins/jquery-ui/jquery-ui.min.js'
import '@/assets/dist/js/adminlte.js'

// import global css
import '@/assets/plugins/fontawesome-free/css/all.min.css'
import '@/assets/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css'
import '@/assets/dist/css/adminlte.min.css'


// Set the base URL of the API
// ApiService.init(process.env.VUE_APP_ROOT_API)
ApiService.init("http://localhost:5000")

// If token exists set header
if (TokenService.getToken()) {
  ApiService.setHeader()
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
