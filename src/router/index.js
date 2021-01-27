import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from "../components/search.vue";
//import Glossary from "./components/glossary.vue"

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Search
  },
  {
    path: '/long-text',
    name: 'LongText',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../components/longText.vue')
  }
]

const router = new VueRouter({
  "routes": routes,
  scrollBehavior (to, from, savedPosition) {
    console.log(from);
    if (to.hash) {
      console.log(to.hash)
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ selector: to.hash, offset: { x: 0, y: 80 }})
        }, 500)
      })
    } else if (savedPosition)
      return savedPosition
    return { x: 0, y: 0 }
  }
})

export default router
