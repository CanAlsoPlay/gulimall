import Vue from 'vue'
import Router from 'vue-router'
import Msite from '@/pages/Msite/Msite'
const Order = () => import('@/pages/Order/Order')
const Profile = () => import('@/pages/Profile/Profile')
const Search = () => import('@/pages/Search/Search')
const Login = () => import('@/pages/Login/Login')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/msite',
      name: 'Msite',
      component: Msite
    },
    {
      path: '/order',
      component: Order
    },
    {
      path: '/profile',
      component: Profile
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
