import Vue from 'vue'
import VueRouter from 'vue-router'
// import MdContent from "../components/md-content.vue";

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      component: () => import('../components/md-content.vue')
    },
    {
      path: '/update',
      component: () => import('../components/TriggerBuild.vue')
    },
    {
      path: '/:name',
      component: () => import('../components/md-content.vue')
    }
  ]

const router = new VueRouter({
  "routes": routes,
  
  scrollBehavior (to, from, savedPosition) {
    if (to.hash == '#') return {x:0, y:0}
    else if (to.hash) {
      console.log(to.hash)
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
