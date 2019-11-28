<template>
    <section class="user-details" v-if="user">
        <h2>{{user.username}}'s Page</h2>
        <img :src="user.imgUrl"/>
        <section class="user-items flex">
            <!-- <pre>{{userItems}}</pre> -->
            <item-preview v-for="item in userItems" :key="item._id" :item="item" >
            </item-preview>
        </section>
        <section class="user-wishlist-items"></section>
        <!-- <pre>{{user}}</pre> -->
    </section>
</template>

<script>
// user sees items for sale if userId!==params.id

import store from '../store/index.js'
import ItemPreview from '../components/ItemPreview.vue'

export default {
    name: 'user-details',
    store: store,
    data(){
        return {
            userId: null,
            // userSoldItems: []
        }
    },
    computed:{
        user(){
            return this.$store.getters.user
        },
        userItems(){
            var items = this.$store.getters.items.filter(item => item.owner._id === this.userId)
            // console.log('user items:', items);
            return items
        }
    },
    created(){
        this.userId = this.$route.params.id
        const userId = this.userId
        this.$store.dispatch({type: 'loadUser', userId})
        // change to agregation to bring the user items
    },
    components:{
        ItemPreview
    },
}
</script>

<style lang="scss" scoped>
    // .wishlist-item{
    //     width: 200px;
    //     height: 400px;
    // }
</style>