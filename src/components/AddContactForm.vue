<template>
  <div>
    <form>
      <input type="text" v-model="name">
      <input type="email" placeholder="email" v-model="email" >
      <span @click="add_contact">Add</span>
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
    add_contact: async function(){
      let { id, name, email } = this
      let decode = await jwt.decode(this.token, { complete: true})
      id = decode.payload.id
      let contact = {
        id: id,
        name: name,
        email: email
      }
      this.post_contact(contact)
    },
    post_contact: async function(state){
      try{
        await axios.post(POST_CONTACT, state , {
          headers: {'Authorization': `Bearer ${this.token}`}
        })
        this.$store.dispatch('ACTION_POST_CONTACT', state)
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