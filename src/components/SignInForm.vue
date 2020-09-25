<template>
  <div class="container__form container--signin">
    <form action="#" class="form" id="form2">
      <h2 class="form__title">Sign In</h2>
      <input required v-model="email" class="input" type="email" placeholder="Email" />
      <input required  v-model="password" class="input" type="password" placeholder="Password" />
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
import { GET_SIGN_UP } from "../../config/routesRequest"

export default {
  data () {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    async getUserRequest() {
      try{
        const { email, password } = this
        const result = await axios.post(GET_SIGN_UP, { email, password})
        if(result.data.user.email){
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