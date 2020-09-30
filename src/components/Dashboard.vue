<template>
  <div>
    <connectedHeader/>
    <addContactForm/>
    <listContact/>
  </div>
</template>

<script>
import connectedHeader from './ConnectedHeader'
import addContactForm from './AddContactForm'
import listContact from './ListContact'

export default {
  name: "Dashboard",
  components: { connectedHeader, addContactForm, listContact },
   data () {
    return {}
  },
}
</script>