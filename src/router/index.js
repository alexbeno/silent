import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import preHome from '@/components/preHome/preHome'


import oneOne from '@/components/level/oneOne/oneOne'
import oneTwo from '@/components/level/oneTwo/oneTwo'
import oneThree from '@/components/level/oneThree/oneThree'

import twoOne from '@/components/level/twoOne/twoOne'
import twoTwo from '@/components/level/twoTwo/twoTwo'
import twoThree from '@/components/level/twoThree/twoThree'

import threeOne from '@/components/level/threeOne/threeOne'
import threeTwo from '@/components/level/threeTwo/threeTwo'
import threeThree from '@/components/level/threeThree/threeThree'

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
    {
      path: '/oneTwo',
      name: 'oneTwo',
      component: oneTwo
    },
    {
      path: '/oneThree',
      name: 'oneThree',
      component: oneThree
    },
    {
      path: '/twoOne',
      name: 'twoOne',
      component: twoOne
    },
    {
      path: '/twoTwo',
      name: 'twoTwo',
      component: twoTwo
    },
    {
      path: '/twoThree',
      name: 'twoThree',
      component: twoThree
    },
    {
      path: '/threeOne',
      name: 'threeOne',
      component: threeOne
    },
    {
      path: '/threeTwo',
      name: 'threeTwo',
      component: threeTwo
    },
    {
      path: '/threeThree',
      name: 'threeThree',
      component: threeThree
    },
  ]
})
