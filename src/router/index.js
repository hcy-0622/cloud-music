import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Recommend = () => import('../views/recommend/index.vue')
const Singer = () => import('../views/singer/index.vue')
const Rank = () => import('../views/rank/index.vue')
const Search = () => import('../views/search/index.vue')
const Detail = () => import('../views/detail/index.vue')
const Me = () => import('../views/me/index.vue')

const routes = [{
  path: '/',
  redirect: '/recommend'
}, {
  path: '/recommend',
  component: Recommend,
  children: [{
    path: 'detail/:id/:type',
    component: Detail
  }]
}, {
  path: '/singer',
  component: Singer,
  children: [{
    path: 'detail/:id/:type',
    component: Detail
  }]
}, {
  path: '/rank',
  component: Rank,
  children: [{
    path: 'detail/:id/:type',
    component: Detail
  }]
}, {
  path: '/search',
  component: Search
}, {
  path: '/me',
  component: Me
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
