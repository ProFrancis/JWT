<template>
  <div>
    <form>
      <input type="name" placeholder="name" v-model="name">
      <input type="email" placeholder="email" v-model="email">
      <input type="text" placeholder="password" v-model="password">
      <button @click="signUp(name, email, password)">Sing-Up</button>
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
        await axios.post(`${POST_SING_UP}`, user)
        this.$store.dispatch('ACTION_POST', user)
      }catch(error){
        console.error("ERROR POST USER ----> ", error)
      }
    }
  }
}
</script>