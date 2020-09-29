<template>
  <div class="container__form container--signin">
    <form action="#" class="form" id="form2">
      <h2 class="form__title">Sign In</h2>
      <input type="email" placeholder="Email" class="input" :class="{'input-error': $v.email.$error }" v-model.trim="$v.email.$model"/>
      <div class="error" v-if="!$v.email.email">Email is invalid</div>
      <div v-if="!$v.email.required" class="error-req" :class="{'error-requred': $v.email.$error }">Veuillez renseigner un Email.</div>
      <input type="password" placeholder="Password" class="input" :class="{'input-error': $v.password.$error }"  v-model.trim="$v.password.$model"/>
      <div v-if="!$v.password.minLength">Votre mot de passe doit faire au moins {{$v.password.$params.minLength.min}} charactèrs.</div>
      <div class="error-req" :class="{'error-requred': $v.password.$error }" v-if="!$v.password.required">Veuillez renseigner un password.</div>
      <div class="okok">
        <div class="link">
          <span class="link__text" @click="getUserRequest">Sign In</span>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios"
import { GET_SIGN_IN } from "../../config/routesRequest"
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  data () {
    return {
      email: '',
      password: '',
    }
  },
  validations: {
      email: { required ,email},
      password: { required,  minLength: minLength(2)}
  },
  methods: {
    async getUserRequest() {
      try{
        const { email, password } = this
        const result = await axios.post(GET_SIGN_IN, { email, password})
        if(result.data.payload.email){
          this.$store.dispatch('AUTH_REQUEST', result.data)
          this.$router.push("Dashboard")
        }else console.log("cannot find this email")
      }catch(error){
        console.error("error get this email ----> ", error)
      }
    }
  }
}
</script>