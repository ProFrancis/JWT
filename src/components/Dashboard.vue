<template>
  <div>
    <connectedHeader/>
    <addContactForm/>
  </div>
</template>

<script>
import connectedHeader from './ConnectedHeader'
import addContactForm from './AddContactForm'
export default {
  name: "Dashboard",
  components: { connectedHeader, addContactForm },
   data () {
    return {}
  },
}
</script>