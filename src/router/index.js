import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import preHome from '@/components/preHome/preHome'


import oneOne from '@/components/level/oneOne/oneOne'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'preHome',
      component: preHome
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/oneOne',
      name: 'oneOne',
      component: oneOne
    },
  ]
})
