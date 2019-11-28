<template>
    <section class="wish-list">
        <el-drawer
        class="wish-list-drawer"
        title="Wish List"
        :visible.sync="toggleWishList"
        direction="ltr"
        size="50%">
        <el-table :data="gridData">
            <el-table-column property="date" label="Date" width="20"></el-table-column>
            <el-table-column property="name" label="Name" width="20"></el-table-column>
        </el-table>
        </el-drawer>
    </section>
</template>

<script>
export default {
  data() {
    return {
      // open: false,
      dialog: false,
      loading: false,
      gridData: [{
        date: '2016-05-02',
        name: 'Peter Parker',
        address: 'Queens, New York City'
      }, {
        date: '2016-05-04',
        name: 'Peter Parker',
        address: 'Queens, New York City'
      }],
    }},
    computed: {
        toggleWishList() {
            console.log('in appwishlist: ', this.$store.getters.toggleWishList)
            return this.$store.getters.toggleWishList
        }
    }
}
</script>
