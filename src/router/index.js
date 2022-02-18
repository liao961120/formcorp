import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from "../components/search.vue";
// import MdContent from "../components/md-content.vue";
//import Glossary from "./components/glossary.vue"

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'About',
    component: () => import('../components/md-content.vue')
  },
  {
    path: '/resources/',
    name: 'external_links',
    component: () => import('../components/md-content.vue')
  },
  {
    path: '/search/',
    name: 'Search',
    component: Search
  },
  {
    path: '/long-text/:id',
    name: 'LongText',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../components/longText.vue')
  },
  {
    path: '/language/',
    name: 'Language',
    component: () => import('../components/language.vue')
  },
  {
    path: '/coding/',
    name: 'coding',
    component: () => import('../components/md-content.vue')
  },
  {
    path: '/writingsystem/',
    name: 'writingsystem',
    component: () => import('../components/md-content.vue')
  },
  {
    path: '/stories/',
    name: 'stories',
    component: () => import('../components/md-content.vue')
  },
]

const router = new VueRouter({
  "routes": routes,
  
  scrollBehavior (to, from, savedPosition) {
    if (to.hash == '#') return {x:0, y:0}
    else if (to.hash) {
      // console.log('HASH: ', to.hash)
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ selector: to.hash, offset: { x: 0, y: 80 }})
        }, Number(to.hash.replace('#', ''))*5)
      })
    } else if (savedPosition)
      return savedPosition
    return { x: 0, y: 0 }
  }
  
})

export default router
