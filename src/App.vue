<template>
  <div id="app">
    <div v-if="this.$route.fullPath == '/'">
      <MyHeader />
    </div>
    <MyJumbotron 
      :route="$route.fullPath"
    />
  </div>
</template>

<script>
// COMPONENTS
import MyHeader from './components/layout/MyHeader.vue'
import MyJumbotron from './components/MyJumbotron.vue'

export default {
  name: 'App',
  components: { MyHeader, MyJumbotron },
  data (){
    return {
      state: ""
    }
  },
}
</script>