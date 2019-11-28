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
            <router-link to="/user/:id">Sign In</router-link>

            <button class="heart-btn-header" @click="clicked"><i class="fa fa-heart" ></i></button>
            <p>{{wishedItemsCount}}</p>

          </div>
    </section>
</template>


<script>

export default {
    computed: {
        wishedItemsCount() {
            return this.$store.getters.wishlistItemsCount
        },
        wishedItemsList() {
          console.log("WishList!!!!")
            return this.$store.getters.wishedItemsList
        }
    },
    methods: {
      clicked() {
        this.$store.commit('openWishList');
    }
  }
}
</script>
