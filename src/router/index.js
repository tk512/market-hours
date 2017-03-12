import Vue from 'vue'
import Router from 'vue-router'
import Markets from '@/components/Markets'
import About from '@/components/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Markets',
      component: Markets
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
