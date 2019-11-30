<template>
    <section class="wish-list">
        <el-drawer
        class="wish-list-drawer"
        title="Wish List"
        :visible.sync="toggleWishList"
        direction="ltr"
        size="50%">
          <table class="wishList-table">
            <th class="title">I wish to buy</th>
            <th class="price">It costs</th>
            <th class="img">This will look greate on me</th>
            <th class="owner">Uploaded by</th>
            <tr>
            <tr v-for="item in wishedItemsUserList" :key="item._id" :item="item">
              <router-link :to="`/item/${item._id}`"><th>{{item.name}}</th></router-link>
              <td>${{item.price}}</td>
              <td>{{item.imgUrl}}</td>
              <!-- <h2>Seller: {{item.owner.name}}</h2> -->
            </tr>
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
            console.log("wishlist-app wish", this.$store.getters.wishedItemsList)
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
