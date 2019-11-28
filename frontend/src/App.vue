<template>
  <div id="app" class="text-center">
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

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    AppWishList
  }
}
</script>


<style lang="scss">

</style>
