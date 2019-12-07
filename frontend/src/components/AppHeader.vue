<template>
    <section class="app-header border-bottom flex flex-between">
        <div class="left-nav bold flex align-center">
          <router-link to="/"><h1 class="logo inline" title="Home Page">B-good</h1></router-link>
          <select class="select pointer" placeholder="Categories">
            <option default>Categories</option>
            <option>Clothes</option>
            <option>Accessories</option>
            <option>Shoes</option>
          </select>
        </div>
        <div class="nav bold flex align-center">
          <input class="header-search border-bottom" type="text"/>
          <span class="search pointer"><i class="fa fa-search"  title="Serch"></i></span>
          <router-link to="/item">Explore</router-link> | 
          <router-link to="/signin" v-if="!loggedInUser">SignIn</router-link>
          <div v-if="loggedInUser" class="flex">
            <router-link :to="`/user/${loggedInUser._id}`">{{loggedInUser.firstName}}'s Page</router-link>
            <router-link to="/"  @click="logOut">
              <button @click="logOut">Log Out</button>
            </router-link>
          </div>
          <i class="fa fa-heart pointer" @click="clicked" title="Wish List"></i>
        </div>
    </section>
</template>

<script>
export default {
  methods: {
    clicked() {
      this.$bus.emit('toggleWishList')
    },
    logOut() {
      this.$store.dispatch('logOut');
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser
    }
  }
}
</script>
