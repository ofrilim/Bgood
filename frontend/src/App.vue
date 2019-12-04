<template>
  <div id="app" class="appVue text-center flex-row">
    <AppHeader/>
    <AppWishList v-if="this.$store.state.currUser"/>
    <main>
      <router-view/>
    </main>
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

