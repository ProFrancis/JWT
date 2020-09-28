<template>
  <div>
    <form>
      <input type="text" v-model="name">
      <input type="email" v-model="email" >
      <button @click="add_contact">Add</button>
    </form>
  </div>
</template>

<script>
import axios from "axios"
import { POST_CONTACT } from "../../config/routesRequest"
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  name: "AddContactForm",
   data () {
    return {
      state: '',
      name: '',
      email:'',
    }
  },
  validations: {
    name: { required, minLength: minLength(2)},
    email: { required, email}
  },
  methods: {
    add_contact: function(name, email) {
      this.state = {
        name: name,
        email: email,
      }
      this.post_contact(this.state)
    },
    post_contact: async function(contact){
      try{
        await axios.post(POST_CONTACT, contact)
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