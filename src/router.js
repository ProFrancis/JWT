import Vue from 'vue'
import Router from 'vue-router'
import SignInForm from './components/SignInForm.vue'
import SignUpForm from './components/SignUpForm.vue'
import Dashboard from './components/Dashboard.vue'


Vue.use(Router)

export default new Router({
  routes: [
    { 
      path: '/sign-in', 
      name: "sign-in",
      component: SignInForm 
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUpForm
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
})