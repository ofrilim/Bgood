<template>
    <section class="wish-list">
        <el-drawer
        class="wish-list-drawer"
        title="Wish List"
        :visible.sync="toggleWishList"
        direction="ltr"
        size="50%">
          <ul>
            <li>

            <!-- <li v-for="itemInWish in itemsInWish" :key="itemInWish._id" :itemInWish="itemInWish"> -->
              {{wishedItemsUserList}}
            </li>
          </ul>
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
        }
      }
}
</script>
