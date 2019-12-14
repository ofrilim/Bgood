<template>
  <div id="app">
    <AppHeader/>
    <AppWishList/>
    <main>
      <h1 class="user-msg action-buy frame" v-if="msg">{{msg}}</h1>
      <router-view/>
    </main>
    <AppFooter/>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import AppWishList from './components/AppWishList.vue';

export default {
  name: 'App',
  created() {
      this.$store.dispatch('loadLoggedInUser')
      this.$store.dispatch({type: 'loadItems', filterBy: {}})
  },
  computed: {
        msg(){      // CHECK msg THING HERE => also above at template
            return this.$store.getters.msg
        },
    },
  components: {
    AppHeader,
    AppFooter,
    AppWishList,
  }
}
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
}
main {
  min-height: 60vh;
}
</style>

