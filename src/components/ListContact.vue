<template>
  <div>
    <h1>List</h1>
    <p v-for="(contact, id) in contacts.result" :key="id">
      {{ contact.name }}
      {{ contact.email }}
    </p>
  </div>
</template>

<script>
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { mapGetters } from 'vuex'
import { GET_CONTACT } from "../../config/routesRequest"

export default {
  name: "ListContact",
  data(){
    return{
      id: ""
    }
  },
  mounted: function(){
    this.getContact()
  },
  computed: mapGetters(['token', 'contacts']),
  methods: {
    async getContact(){
      console.log("CONTACTS -> ", this.contacts.result)
      let decode = await jwt.decode(this.token, {complete: true})
      this.id = decode.payload.id
      let {data} = await axios.get(GET_CONTACT + `/${this.id}`, {
        headers: {'Authorization': `Bearer ${this.token}`}
      })
      this.$store.dispatch('ACTION_GET_CONTACT', data )
    }
  }
}
</script>