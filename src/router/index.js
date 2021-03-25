import Vue from 'vue'
import Router from 'vue-router'
import Msite from '@/pages/Msite/Msite'
const Order = () => import('@/pages/Order/Order')
const Profile = () => import('@/pages/Profile/Profile')
const Search = () => import('@/pages/Search/Search')
const Login = () => import('@/pages/Login/Login')
const Shop = () => import('@/pages/Shop/Shop')
const ShopGoods = () => import('@/pages/Shop/ShopGoods/ShopGoods')
const ShopRatings = () => import('@/pages/Shop/ShopRatings/ShopRatings')
const ShopInfo = () => import('@/pages/Shop/ShopInfo/ShopInfo')
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
    },
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: '',
          redirect: '/shop/goods'
        },
        {
          path: '/shop/goods',
          component: ShopGoods
        },
        {
          path: '/shop/ratings',
          component: ShopRatings
        },
        {
          path: '/shop/info',
          component: ShopInfo
        }
      ]
    }
  ]
})
