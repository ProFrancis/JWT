<template>
  <div>
    <form>
      <input type="text" placeholder="name" v-model="name">
      <input type="email" placeholder="email" v-model="email" >
      <span @click="post_contact">Add</span>
    </form>
  </div>
</template>

<script>
import axios from "axios"
import jwt from 'jsonwebtoken'
import { mapGetters } from 'vuex'
import { POST_CONTACT } from "../../config/routesRequest"
// import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  name: "AddContactForm",
   data () {
    return {
      id: "",
      name: "",
      email: ""
    }
  },
  computed: mapGetters(['token', 'user']),
  // validations: {
  //   name: { required, minLength: minLength(2)},
  //   email: { required, email}
  // },
  methods: {
    post_contact: async function(){
      try{
      let { id, name, email } = this
      const decode = await jwt.decode(this.token, { complete: true})
      id = decode.payload.id
      console.log(decode.payload)
        await axios.post(POST_CONTACT, { name, email, id})
        // this.$store.dispatch('ACTION_POST', contact)
      }catch(err){
        console.error("ERROR POST CONTACT --> ", err)
      }
    }
  },
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