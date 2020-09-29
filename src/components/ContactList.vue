<template>
  <div>
    <span @click="contacts">eeeeee</span>
  </div>
</template>

<script>
import axios from "axios"
import jwt from 'jsonwebtoken'
import { mapGetters } from 'vuex'
import { GET_CONTACT } from "../../config/routesRequest"

export default {
  name: "ContactList",
  computer: mapGetters(['token']),
  methods: {
    async getContacts(){
      try{  
        const decode = await jwt.decode(this.token, { complete: true})
        console.log("DECODE A --> ", decode)

        const { id } = decode.payload
        console.log("DECODE B --> ", decode.payload)
        console.log("ID C --> ", id)
        const { data } = await axios.get(GET_CONTACT + `/${id}`)
        console.log("DATA D ---> ", data)
        this.$store.dispatch('ACTION_GET_CONTACT', data)
      }catch(err){
        console.error("Cannot get contacts E --> ", err)
      }
    },
    async contacts(){
      console.log("salut")
      let decode = await jwt.decode(this.token, { complete: true})
      console.log(decode)
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
</style>