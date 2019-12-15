<template>
    <section class="app-header flex flex-between caps">
        <div class="screen" :class="open" @click="onToggleNavBar"></div>        
        <div class="left-nav bold flex align-center">
          <router-link to="/"><h1 class="logo inline" title="Home Page">B-good</h1></router-link>
          <!-- <select class="select pointer" placeholder="Categories">
            <option default>Categories</option>
            <option>Clothes</option>
            <option>Accessories</option>
            <option>Shoes</option>
          </select> -->
        </div>
        <div class="nav bold flex align-center">
          <button class="hamburger-btn" @click="onToggleNavBar">
            <i class="fa fa-bars"></i>
          </button>
          <nav class="nav-bar spread-nav-bar bold flex align-center" :class="{ 'open-menu' : isOpen }">
            <router-link to="/item">Explore</router-link>
            <router-link to="/signin" v-if="!loggedInUser">SignIn</router-link>
            <div v-if="loggedInUser" class="flex user-nav">
              <router-link :to="`/user/${loggedInUser._id}`">{{loggedInUser.firstName}}'s Page</router-link>
              <router-link to="/" @click="logOut" class="logOut"><button @click="logOut">Log Out</button></router-link>
            </div>
          </nav>
          <i class="fa fa-heart pointer" @click="clicked" title="Wish List"></i>
        </div>
    </section>
</template>

<script>
export default {
  data(){
    return {
      isOpen: false,
    }
  },
  methods: {
    clicked() {
      this.$bus.emit('toggleWishList')
    },
    logOut() {
      this.$store.dispatch('logOut');
    },
    onToggleNavBar(){
      this.isOpen = !this.isOpen
    },
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser
    },
    open() {
      if (this.isOpen) return 'open-screen'
      else return false;
    }
  }
}
</script>
