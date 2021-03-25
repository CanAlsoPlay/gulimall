import Vue from 'vue'
import Router from 'vue-router'
import Msite from '@/pages/Msite/Msite'
const Order = () => import('@/pages/Order/Order')
const Profile = () => import('@/pages/Profile/Profile')
const UserInfo = () => import('@/pages/Profile/UserInfo')
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
      component: Msite,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/userInfo',
      component: UserInfo
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooter: true
      }
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
