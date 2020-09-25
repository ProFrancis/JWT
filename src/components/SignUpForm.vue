<template>
  <div class="container__form container--signup">
    <form action="#" class="form" id="form1">
      <h2 class="form__title">Sign Up</h2>
      <input type="text" placeholder="Name" class="input" v-model="name"/>
      <input type="email" placeholder="Email" class="input" v-model="email"/>
      <input type="password" placeholder="Password" class="input" v-model="password"/>
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

export default {
  data () {
    return {
      state: "",
      name: "",
      email: "",
      password: ""
    }
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