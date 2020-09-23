import Vue from 'vue'
import Router from 'vue-router'
import SignInForm from './components/SignInForm.vue'
import SignUpForm from './components/SignUpForm.vue'
import FormHandler from './components/FormHandler.vue'


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
      path: '/FormHandler',
      name: 'FormHandler',
      component: FormHandler
    }
  ]
})