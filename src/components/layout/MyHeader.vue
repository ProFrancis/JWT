<template>
  <div>
    <h1>Connexion</h1>
    <svg style="margin-top:-190px"  viewBox="0 0 800 350">
      <symbol id="s-text">
        <text text-anchor="middle" x="50%" y="35%" class="text--line">Connexion</text>
      </symbol>
      <g class="g-ants">
        <use xlink:href="#s-text" class="text-copy"></use>     
        <use xlink:href="#s-text" class="text-copy"></use>     
        <use xlink:href="#s-text" class="text-copy"></use>     
        <use xlink:href="#s-text" class="text-copy"></use>     
        <use xlink:href="#s-text" class="text-copy"></use>     
      </g>
    </svg>
    <Home />
  </div>
</template>

<script>
import Home from '../Home'

export default {
  name: 'MyHeaders',
  components: { Home }
}
</script>

<style scoped>
@import url('./../../assets/styles.css');

h1{
    padding: 1rem 15rem 1rem 15rem;
    visibility: hidden;
};
</style>
