import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Recommend = () => import('../views/recommend/index.vue')
const Singer = () => import('../views/singer/index.vue')
const Rank = () => import('../views/rank/index.vue')
const Search = () => import('../views/search/index.vue')
const Detail = () => import('../views/detail/index.vue')

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
  component: Singer
}, {
  path: '/rank',
  component: Rank
}, {
  path: '/search',
  component: Search
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
