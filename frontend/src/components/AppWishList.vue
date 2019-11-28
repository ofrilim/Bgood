<template>
    <section class="wish-list">
        <!-- <el-button type="text" @click="open = !open">Open Drawer with nested table</el-button> -->
        <el-drawer
        class="wish-list-drawer"
        title="Wish List"
        :visible.sync="open"
        direction="ltr"
        size="50%">
        <el-table :data="gridData">
            <el-table-column property="date" label="Date" width="150"></el-table-column>
            <el-table-column property="name" label="Name" width="200"></el-table-column>
            </el-table>
        </el-drawer>
    </section>
</template>

<script>
export default {
  data() {
    return {
    //   open: false,
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
      }, {
        date: '2016-05-01',
        name: 'Peter Parker',
        address: 'Queens, New York City'
      }, {
     date: '2016-05-03',
        name: 'Peter Parker',
        address: 'Queens, New York City'
      }],
    }},
    computed: {
        open() {
            return this.$store.getters.open
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
