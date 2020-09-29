<template>
  <div id="app">
    <router-view
      :route="$route.fullPath"
    />
  </div>
</template>

<script>

export default {
  name: 'App',
  data (){
    return {
      state: ""
    }
  },
}
</script>