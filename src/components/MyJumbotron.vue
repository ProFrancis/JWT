<template>
  <div>
    <router-view
      :route="route"
    />
  </div>
</template>

<script>
export default {
  props: {
    route: String,
  }
}
</script>

<style >

</style>