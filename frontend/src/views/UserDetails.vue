<template>
    <section class="user-details" v-if="user">
        <h2>{{user.firstName}}'s Page</h2>
        <h2>Available items:</h2>
            <router-link to='/item/edit'><button class="add-btn btn">Add Item</button></router-link>
            <section class="user-items flex">
                <!--  -->
                <section class="user-item flex flex-wrap">
                    
                    <section>
                        <item-preview v-for="item in userItems" :key="item._id" :item="item"></item-preview>
                    </section>
<!-- 
                    <section v-if="itemsInProcess">
                        <item-preview v-for="item in userItems" :key="item._id" :item="item"></item-preview>
                    </section> -->

                </section>

            <!-- TODO - design this page and remove <BR> // Liron's comment-->
            <section class="user-about">
                <h1>Welcome to {{user.firstName}}'s page</h1>
                <h2>Name: {{user.fullName}}</h2>
                <h2>Email: {{user.email}}</h2>
                <h2>Address: {{user.location}} </h2>
                <br/>
                <img :src="user.imgUrl"/>
                <br/>
                <h2>Items in WishList: {{user.wishListItems}} <i class="fa fa-box-heart"></i></h2> 
                <br>
                <br>
                <button @click="itemsInProcess">
                     <!-- <item-preview v-for="item in incomingOrders" :key="item._id" :item="item">Incomming Orders</item-preview> -->
                </button> 
                       

                <section v-if="incomingOrders.length !== 0">
                    <pre>{{this.incomingOrders}}</pre>
                    <button class="btn">Approve sell</button>
                </section>            
                <button class="btn">Contact Me</button>
            </section>
        </section>
    </section>
</template>

<script>
import ItemPreview from '../components/ItemPreview.vue'

export default {
    name: 'user-details',
    data(){
        return {
            userId: null,
            incomingOrders: [],
        }
    },
    created(){
        const userId = this.$route.params.id
        this.$store.dispatch({type: 'loadUser', userId })
        console.log("UserId: ", userId)
    },
    methods:{
        addItem(){
            
        },
        itemsInProcess(){
            this.itemsToShow = 'process';
            var items = this.$store.getters.items.filter(item => {
                return item.owner._id === this.userId && item.status === "In process"})
            if (items && items.length !== 0) this.incomingOrders = items
            console.log('in process items:', items);
        }
    },
    computed:{
        user(){
            return this.$store.getters.user
        },
        userItems(){
            var items = this.$store.getters.items.filter(item => item.owner._id === this.userId)
            console.log("ITEM: ", items)
            return items
        },
    },
    components:{
        ItemPreview
    },
}
</script>
