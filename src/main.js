// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// Initial time zone
import moment from 'moment-timezone'
import shared from './shared'
shared.clientTz = moment.tz.guess()

require('font-awesome-webpack')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})

// Activate Google Analytics
const gaId = 'UA-93724025-1'
Vue.use(VueAnalytics, {id: gaId, router})
