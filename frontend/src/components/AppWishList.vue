<template>
    <section class="wish-list">
        <el-drawer class="wish-list-drawer" :visible.sync="toggleWishList"
                   direction="ltr" size="100%">
        <h1 class="title center">Your Wish List <i class="fa fa-heart"></i></h1>
        <div v-if="itemsToShow.length > 0">
          <ul class="wishList-ul center">
            <li class="grid" v-for="item in itemsToShow" :key="item._id">
              <router-link :to="`/item/${item._id}`"><img :src="item.imgUrl"/></router-link>
              <div class="content grid">
                <h2>{{item.name}}</h2>
                <h2 class="price">$ {{item.price}}</h2>
                <h2>Seller: <img class="avatar-img" :src="item.byUser.imgUrl"/></h2>
              </div>
              <div class="btns flex flex-col justify-center flex-evenly">
                <button class="btn action-buy" @click="buy(item._id)">Buy</button>
                <button class="btn action-remove" @click="remove(item._id)">Remove</button>
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
      toggleWishList: false,
      }
    },
    created() {
        this.$bus.on('toggleWishList', () => {
        this.toggleWishList = !this.toggleWishList;
      })
    },
    methods: {
      remove(itemId) {
        this.$store.dispatch({ type: 'removeFromWishList', itemId })
      },
      buy(itemId) {
        console.log('APPWISHLIPT CPM BUYING itemid: ', itemId)
        // this.$store.dispatch('buyItem', itemId)      //  TODO: CONTINUE WITH BUYING PROCCESS
        this.$store.dispatch({ type: 'setMsg', msg: 'Message sent to the seller succefuly' })

      }
    },
    computed: {
      itemsToShow() {
        const items = this.$store.getters.items;
        return items.filter((item) => {
          return this.wishList.includes(item._id);
        })
      },
      wishList() {
        return this.$store.getters.wishList;
      },
    }
}
</script>
