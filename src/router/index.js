import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Agencies from '../views/Agencies.vue'
import DateScreen from '../views/DateScreen.vue'
import Routes from '../views/Routes.vue'
import Origins from '../views/Origins.vue'
import Destinations from '../views/Destinations.vue'
import Timetable from '../views/Timetable.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Agencies
  },
  {
    path: '/date',
    name: 'Date',
    component: DateScreen
  },
  {
    path: '/routes',
    name: 'Routes',
    component: Routes
  },
  {
    path: '/origins',
    name: 'Origins',
    component: Origins
  },
  {
    path: '/destinations',
    name: 'Destinations',
    component: Destinations
  },
  {
    path: '/timetable',
    name: 'Timetable',
    component: Timetable
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
