// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import '../node_modules/font-awesome/css/font-awesome.min.css'
import App from './App'

// import axios from './axios.config.js'
// import axios from 'axios'
import store from './store/store.js'

// Vue.prototype.axios = axios
/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  template: '<App/>',
  components: { App }
})
