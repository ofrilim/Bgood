import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import ItemApp from '../views/ItemApp.vue'
import ItemDetails from '../views/ItemDetails.vue'
import ItemEdit from '../views/ItemEdit.vue'
import SignIn from '../views/SignIn.vue'
import UserDetails from '../views/UserDetails.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/item',
    name: 'ItemApp',
    component: ItemApp
  },
  {
    path: '/item/:id',
    name: 'item-details',
    component: ItemDetails
  },
  {
    path: '/item/edit/:id?',
    name: 'item-edit',
    component: ItemEdit
  },
  {
    path: '/signin',
    name: 'sign-in',
    component: SignIn
  },
  {
    path: '/user/:id',
    name: 'user-details',
    component: UserDetails
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
