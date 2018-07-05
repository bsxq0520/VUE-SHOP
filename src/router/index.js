import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/page/home/Home'
import City from '@/page/city/City'
import Site from '@/page/site/Site'
import FoodTypes from '@/page/foodTypes/FoodTypes'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/home'
    },
    // 首页
    {
      path: '/home',
      component: Home
    },
    // 选择城市页
    {
      path: '/city/:cityId',
      component: City
    },
    // 所有商品列表页
    {
      path: '/site',
      component: Site
    },
    // 选择商品类型页
    {
      path: '/foodTypes',
      component: FoodTypes
    }
  ]
})
