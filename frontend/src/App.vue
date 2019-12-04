<template>
  <div id="app" class="appVue text-center flex-row">
    <AppHeader/>
    <AppWishList v-if="this.$store.state.currUser"/>
<<<<<<< HEAD
      <router-view/>
=======
    <main>
      <router-view/>
    </main>
>>>>>>> bfd38b12914ff40cc323872228f293d9cce5f0ee
    <AppFooter/>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import AppWishList from "./components/AppWishList.vue";

export default {
  name: 'App',
  created(){
        this.$store.dispatch('loadItems')
  },
  components: {
    AppHeader,
    AppFooter,
    AppWishList,
  }
}
</script>

<style scoped>
main {
  padding-top: 70px;
}
</style>

