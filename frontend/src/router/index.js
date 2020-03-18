import Vue from 'vue'
import VueRouter from 'vue-router'
import homePage from '../views/home-page.vue'
import aboutPage from '../views/about-page.vue'
import stationPage from '../views/station-page.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homePage',
    component: homePage
  },
  {
    path: '/about',
    name: 'aboutPage',
    component: aboutPage
  },
  {
    path: '/station',
    name: 'stationPage',
    component: stationPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
