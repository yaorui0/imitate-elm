import Vue from 'vue'
import VueRouter from 'vue-router'
import Goods from '@/components/goods/Goods.vue'
import Ratings from '@/components/ratings/Ratings.vue'
import Seller from '@/components/seller/Seller.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/goods',
    name: 'goods',
    component: Goods
  },
  {
    path: '/ratings',
    name: 'ratings',
    component: Ratings
  },
  {
    path: '/seller',
    name: 'seller',
    component: Seller
  },
  {
    path: '/test',
    name: 'test',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Test.vue')
  }
]

const router = new VueRouter({
  // linkActiveClass: 'active', //重定义router-link-active样式
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.push('/seller'); //首次进入的页面
export default router
