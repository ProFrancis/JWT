<template>
  <div class="connectedHeader">
    <h1>Dashboard
      <p>
        Bonjour <span style="color: #81a391">{{user.name}}</span> ! 😝
      </p>
      <span @click="logout">See you next time </span> 😞
    </h1>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import { DELETE_TOKEN } from "../../config/routesRequest"

export default {
  name: "ConnectedHeader",
  computed: mapGetters(['token', 'user']),
  methods: {
    async logout(){
      try{
        await axios.delete(DELETE_TOKEN + `/${this.token[0]}`)
        this.$store.dispatch('AUTH_LOGOUT')
        this.$router.push( '/')
      }catch(err){
        console.error(err)
      }
    }
  }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
}
  h1{ 
    position: absolute;
    top: 0px;
    text-align: center;
    margin-left: -8%;
  };
  p{
    font-size: 2rem;
    position: absolute;
    top: 50px;
  };
</style>