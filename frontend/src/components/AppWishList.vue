<template>
    <section class="wish-list">
        <!-- <el-button type="text" @click="open = !open">Open Drawer with nested table</el-button> -->
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

<style lang="scss" scoped>
.wish-list-drawer {
    background-color: rgb(247, 208, 215);
    right: 0;
    height: 80%;
    animation: 'rtl-drawer-in' .3s 1ms;
}
</style>
