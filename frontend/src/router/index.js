import Vue from 'vue'
import VueRouter from 'vue-router'
import homePage from '../views/home-page.vue'
import aboutPage from '../views/about-page.vue'
import stationPage from '../views/station-page.vue'
import stationEdit from '../views/station-edit.vue'
import stationDetails from '../views/station-details.vue'
import userSignup from '../views/user-signup.vue'
import userManagement from '../views/user-management.vue'
import userProfile from '../views/user-profile.vue'

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
  },
  {
    path: '/station/edit/:id?',
    name: 'stationEdit',
    component: stationEdit
  },
  {
    path: '/station/:id',
    name: 'stationDetails',
    component: stationDetails
  },
  {
    path: '/signup',
    name: 'userSignup',
    component: userSignup
  },
  {
    path: '/user',
    name: 'userManagement',
    component: userManagement
  },
  {
    path: '/user/:id',
    name: 'userProfile',
    component: userProfile
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
