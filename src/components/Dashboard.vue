<template>
  <div>
    <connectedHeader/>
    <addContactForm/>
    <contactList/>
  </div>
</template>

<script>
import connectedHeader from './ConnectedHeader'
import addContactForm from './AddContactForm'
import contactList from './ContactList'

export default {
  name: "Dashboard",
  components: { connectedHeader, addContactForm, contactList },
   data () {
    return {}
  },
}
</script>