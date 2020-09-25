import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Dashboard from './components/Dashboard.vue'
import { store } from './store'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    { 
      path: '/', 
      name: "home",
      component: Home,
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: "/404",
      alias: "*",
      name: "notFound",
      component: () => 
        import("./components/NotFound.vue")
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!store.state.token[0]) next("/")
    else next()
  }
})

export default router;