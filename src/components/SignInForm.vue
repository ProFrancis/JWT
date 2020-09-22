<template>
  <div>
    <form>
      <input type="email" placeholder="email" v-model="email">
      <input type="text" placeholder="password" v-model="password">
      <button @click="getUser(email, password)">connexion</button>
    </form>
    <div>
</div>
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