<template>
  <div class="container__form container--signup">
    <form action="#" class="form" id="form1">
      <h2 class="form__title">Sign Up</h2>
      <input type="text" placeholder="Name" class="input" :class="{'input-error': $v.name.$error }"  v-model.trim="$v.name.$model"/>
      <div class="error" v-if="!$v.name.minLength">Veuillez renseigner votre nom.</div>
      <div class="error-req" :class="{'error-requred': $v.name.$error }" v-if="!$v.name.required">Veuillez renseigner un nom.</div>
      <input type="email" placeholder="Email" class="input" :class="{'input-error': $v.email.$error }" v-model.trim="$v.email.$model"/>
      <div class="error" v-if="!$v.email.email">Email is invalid</div>
      <div class="error-req" :class="{'error-requred': $v.email.$error }" v-if="!$v.email.required">Veuillez renseigner un Email.</div>
      <input type="password" placeholder="Password" class="input" :class="{'input-error': $v.password.$error }"  v-model.trim="$v.password.$model"/>
      <div v-if="!$v.password.minLength">Votre mot de passe doit faire au moins {{$v.password.$params.minLength.min}} charactèrs.</div>
      <div class="error-req" :class="{'error-requred': $v.password.$error }" v-if="!$v.password.required">Veuillez renseigner un password.</div>
      <div class="okok">
        <div class="link">
          <span class="link__text" @click="signUp()">Sign Up</span>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios"
import { POST_SING_UP } from "../../config/routesRequest"
import { required, minLength, email, between } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      state: "",
      name: '',
      email: "",
      password: ""
    }
  },  
  validations: {
    name: { required, minLength: minLength(2) },
    email: { required, email },
    password: { required, minLength: minLength(2)}
  },
  methods: {
    signUp: function(name, email, password) {
      this.state = {
        name: name,
        email: email,
        password: password
      }
      this.postRequest(this.state)
    },
    async postRequest(user) {
      try{
        await axios.post(POST_SING_UP, user)
        this.$store.dispatch('ACTION_POST', user)
      }catch(error){
        console.error("ERROR POST USER ----> ", error)
      }
    }
  }
}
</script>