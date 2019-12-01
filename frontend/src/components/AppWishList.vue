<template>
    <section class="wish-list center">
        <el-drawer
        class="wish-list-drawer"
        title="My Wish-List"
        :visible.sync="toggleWishList"
        direction="ltr"
        size="100%">
          <table class="wishList-table center" v-for="item in wishedItemsUserList" :key="item._id" :item="item">
            <tb>  
            <tr class="center"><i class="fa fa-star"></i></tr>
            <br>
            <div class="tooltip">
              <tr><router-link class="title flex center" :to="`/item/${item._id}`">{{item.name}}</router-link>
              </tr><span class="tooltiptext">for more details</span>
            </div>
            <br>
            <tr class="price">Only for ${{item.price}}</tr>
            <br>
            <tr><button class="action-buy">I wish to buy</button></tr>
            <tr><button class="action-remove">Remove</button></tr>
            </tb>
            </table>
        </el-drawer>
    </section>
</template>

<script>
export default {
  data() {
    return {
      itemsInWish: []
      }
    },
    computed: {
        toggleWishList() {
            return this.$store.getters.toggleWishList
        },
        wishedItemsUserList() { 
            // console.log("wishlist-app wish", this.$store.getters.wishedItemsList)
            return this.$store.getters.wishedItemsList
        },
        // *** LIRON: @click should be activated by clicking the table ***
        // closeWishList() {
        //   // state.isOpenWishList = !state.isOpenWishList
        //   return this.$store.commit('toggleWishList');
          // }
      }
}
</script>
