<template>
    <section class="user-details" v-if="user">
        <h2>{{user.username}}'s Page</h2>
        <img :src="user.imgUrl"/>
            <h2>Available items:</h2>
        <section class="user-items flex">
            <section class="user-item flex flex-wrap">
                <item-preview v-for="item in userItems" :key="item._id" :item="item" >
                </item-preview>
            </section>
            <!-- TODO - Change all data to the item's owner -->
            <section class="user-about">
                Seller: {{user.userItems}}
                <h1>Welcome to my page</h1>
                <h2>Address: {{user.city}}, {{user.state}} </h2>
                <img :src="user.imgUrl"/>
                <!-- // TODO - Change 20 to soldCount: -->
                <h2>Sold items: 20 <i class="fa fa-box-heart"></i></h2> 
                <button>Contact Me</button> |
                <button>Follow</button><br>
                <!-- The HISTORY btn displays sold items: img+title+price+buyer.name -->
                <button>History</button>
            </section>
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