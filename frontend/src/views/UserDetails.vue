<template>
    <section class="user-details" v-if="user">
        <h2>{{user.username}}'s Page</h2>
        <h2>Available items:</h2>
            <router-link to='/item/edit'><button class="add-btn btn">Add Item</button></router-link>
            <section class="user-items flex">
                <section class="user-item flex flex-wrap">
                    <item-preview v-for="item in userItems" :key="item._id" :item="item" >
                    </item-preview>
                </section>            
            <!-- TODO - design this page and remove <BR> // Liron's comment-->
            <section class="user-about">
                <h1>Welcome to {{user.username}}'s page</h1>
                <br>
                <h2>Full Name: {{user.fullname}}</h2>
                <h2>A member of B-good since {{Date.now()}}</h2> 
                <h2>Sold items: {{user.soldItemsCount}} <i class="fa fa-box-heart"></i></h2> 
                <br>
                <h2>Address: {{user.city}}, {{user.state}} </h2>
                <h2>Email: {{user.email}}</h2>
                <h2>Mobile: {{user.tel}}</h2>
                <br>
                <img :src="user.userImg"/>
                <br>
                <br>
                <button>Contact Me</button> |
                <button>Follow</button><br>
                <!-- The HISTORY btn displays sold items: img+title+price+buyer.name -->
                <br>
                <button>
                    <ul class="hover flex flex-wrap flex-around">Sold items
                     <!-- <item-preview v-for="item in userItems" :key="item._id" :item="item" >
                </item-preview> -->
                    </ul>
                </button>
                <br>
                <br>
                <button>Incomming Orders</button>             
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
    methods:{
        addItem(){
            
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