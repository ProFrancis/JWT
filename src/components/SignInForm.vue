<template>
  <div>
    <form action="#" class="form" id="form2">
      <h2 class="form__title">Sign In</h2>
      <input type="email" placeholder="Email" class="input" v-model="email" />
      <input type="password" placeholder="Password" class="input" v-model="password"/>
      <button class="btn" @click="getUser(email, password)" >Sign In</button>
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
          // this.$router.push('FormHandler');
        }else console.log(" ERROR FIND ")
      }catch(error){
        console.error("ERROR GET USER ----> ", error)
      }
    }
  }
}
</script>