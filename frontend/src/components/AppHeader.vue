<template>
    <section class="app-header border-bottom flex flex-between">
        <div class="left-nav bold">
          <router-link to="/"><h1 class="logo inline" title="Home Page">B-good</h1></router-link>
          <select class="select pointer" title="Categories">Categiries
            <option>Clothes</option>
            <option>Accessories</option>
            <option>Shoes</option>
          </select>
        </div>
        <div class="nav bold flex align-center">
          <input class="header-search border-bottom" type="text"/>
          <span class="search pointer"><i class="fa fa-search"></i></span>
          <router-link to="/item">Item App</router-link> | 
          <router-link to="/signin">SignIn</router-link> 
          <!-- <router-link to="/usre/user._id">{{user}}'s Page</router-link> -->
          <button @click="clicked"><span class="heart"></span></button><span>{{wishedItemsCount}}</span>
        </div>
    </section>
</template>


<script>

export default {
    computed: {
        wishedItemsCount() {
          if (!this.$store.getters.wishlistItemsCount) return '0'
          return this.$store.getters.wishlistItemsCount
        },
           },
    methods: {
      clicked() {
        this.$store.commit('openWishList');
    }
  }
}
</script>
