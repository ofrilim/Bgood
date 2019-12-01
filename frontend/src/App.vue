<template>
  <div id="app" class="text-center flex-row">
    <AppHeader/>
    <AppWishList/>
    <router-view/>
    <AppFooter/>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import AppWishList from "./components/AppWishList.vue";
// import SignIn from '../src/views/SignIn.vue';

export default {
  name: 'App',
  created(){
        this.$store.dispatch('loadItems')
  },
  components: {
    AppHeader,
    AppFooter,
    AppWishList,
    // SignIn
  }
}
</script>


<style lang="scss">

</style>
