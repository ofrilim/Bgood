<template>
    <section class="wish-list">
        <el-drawer
        class="wish-list-drawer"
        :visible.sync="toggleWishList"
        direction="ltr"
        size="100%">
        <h1 class="title center">Your Wish List <i class="fa fa-heart"></i></h1>
        <div v-if="itemsInWish">
          <ul class="wishList-ul center" v-for="item in itemsInWish" :key="item._id" :item="item">
            <li class="grid">
              <router-link :to="`/item/${item._id}`"><img :src="item.imgUrl"/></router-link>
              <div class="content grid">
                <h2>{{item.name}}</h2>
                <h2 class="price">$ {{item.price}}</h2>
                <h2>Seller: {{item.owner.name}}</h2>
              </div>
              <div class="btns flex flex-col justify-center flex-evenly">
                <button class="btn action-buy">Buy</button>
                <button class="btn action-remove">Remove</button>
              </div>
            </li>
          </ul>
        </div>
        <h1 v-else>No items in your Wish List</h1>
        </el-drawer>
    </section>
</template>


<script>
export default {
  data() {
    return {
      itemsInWish: [],
      toggleWishList: false
      }
    },
    created() {
      this.$bus.on('toggleWishList', () => {
        this.toggleWishList = !this.toggleWishList;
      })
      // this.itemsInWish = this.$store.getters.wishListItems;
    },
    methods: {
      //  wishListItems() {
      //    this.$store.dispatch('wishListItems')
      //  }
    }
}
</script>
