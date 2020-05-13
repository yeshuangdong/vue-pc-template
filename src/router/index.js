import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('@/views/home')

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'r_home',
      component: Home,
    },
  ],
})
