<template>
  <div id="app" class="text-center">
    <App-Header/>
    <router-view/>
    <App-Footer/>
  </div>
</template>

<script>
import AppHeader from './components/App-Header.vue';
import AppFooter from './components/App-Footer.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>


<style lang="scss">

</style>
