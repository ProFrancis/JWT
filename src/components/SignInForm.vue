<template>
  <div class="container__form container--signin">
    <form action="#" class="form" id="form2">
      <h2 class="form__title">Sign In</h2>
      <input type="email" placeholder="Email" class="input" v-model="email" />
      <input type="password" placeholder="Password" class="input" v-model="password" />
      <div class="okok">
        <div class="link">
          <span class="link__text" @click="getUser(email, password)">Sign In</span>
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
      state: "",
      email: null,
      password: null
    }
  },
  methods: {
    getUser: function(email, password){
      this.state = {
        email: email,
        password: password
      }
      this.getUserRequest(this.state)
    },
    async getUserRequest(user) {
      try{
        const result = await axios.post(`${GET_SIGN_UP}`, user)
        if(result.data.email){
          this.$store.dispatch('ACTION_GET', user)
        }else console.log(" ERROR FIND ")
      }catch(error){
        console.error("ERROR GET USER ----> ", error)
      }
    }
  }
}
</script>