<template>
    <section class="wish-list">
      <div class="screen" :class="open" @click="toggleScreen"></div>
        <el-drawer class="wish-list-drawer" :visible.sync="toggleWishList"
                   direction="ltr" size="100%">
        <h1 class="title center">Your Wish List <i class="fa fa-heart"></i></h1>
        <div v-if="itemsToShow.length > 0">
          <ul class="wishList-ul center">
            <li class="grid" v-for="item in itemsToShow" :key="item._id">
              <router-link :to="`/item/${item._id}`"><img  @click="toggleScreen" :src="item.imgUrl"/></router-link>
              <div class="content grid">
                <h2>{{item.name}}</h2>
                <h2 class="price">$ {{item.price}}</h2>
                <router-link :to="`/user/${item.ownerId}`">
                  <h2>Seller: <img  @click="toggleScreen" class="avatar-img" :src="item.byUser.imgUrl"/></h2>
                </router-link>
              </div>
              <div class="btns flex flex-col justify-center flex-evenly">
                <button class="btn action-buy" @click="buyItem(item)">Buy</button>
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
      toggleScreen() {
        this.toggleWishList = !this.toggleWishList;
      },
      remove(itemId) {
        this.$store.dispatch({ type: 'removeFromWishList', itemId })
      },
      async buyItem(item) {
        var user = this.$store.getters.loggedInUser;   
        const baughtItem = JSON.parse(JSON.stringify(item));
        baughtItem.buyer = user._id;
        baughtItem.status = 'in process';
        await this.$store.dispatch({type: 'saveItem', item: baughtItem});
        this.$store.dispatch({type: 'setMsg', msg: 'Item reserved successfully'});
      }, 
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
      open() {
        if (this.toggleWishList) return 'open-screen'
        else return false;
      }
    }
}
</script>
