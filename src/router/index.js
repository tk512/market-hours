import Vue from 'vue'
import Router from 'vue-router'
import Markets from '@/components/Markets'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Markets',
      component: Markets
    }
  ]
})
