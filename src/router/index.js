import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import about from '@/components/about/about'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/about',
      name: 'about',
      component: about
    }
  ]
})
