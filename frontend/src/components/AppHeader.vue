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
          <router-link to="/item">Item App</router-link> | 
          <router-link to="/signin">SignIn</router-link> 
          <!-- <router-link to="/usre/user._id">{{user}}'s Page</router-link> -->
          <i class="fa fa-heart pointer" @click="clicked" title="Wish List"></i>
        </div>
    </section>
</template>


<script>
export default {
    methods: {
      clicked() {
        this.$bus.emit('toggleWishList')
    }
  }
}
</script>
