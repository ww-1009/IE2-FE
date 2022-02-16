import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Entity from '../components/graph/Entity.vue'
import Porperty from '../components/graph/Porperty.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/home',
      component: Home,
      redirect: '/entity',
      children: [
        { path: '/entity', component: Entity },
        { path: '/porperty', component: Porperty },
      ]
    }
  ]
})

// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component:() =>import('../views/Home.vue'),
//   },

// ]

// const router = new VueRouter({
//   routes
// })

export default router
