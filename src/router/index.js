import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Recommend = () => import('../views/recommend')
const Singer = () => import('../views/singer')
const Rank = () => import('../views/rank')
const Search = () => import('../views/search')

const routes = [{
  path: '/',
  redirect: '/recommend'
}, {
  path: '/recommend',
  component: Recommend
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
