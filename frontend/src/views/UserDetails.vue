<template>
<<<<<<< HEAD
    <section class="user-details-container flex" v-if="user">
        <!-- <h1>{{user.fullName}}'s Page</h1> -->
        <section class="details-container flex flex-between">
            <section class="user-about flex-col">
                <h1>Welcome to {{user.firstName}}'s page</h1>
                <img class="user-img" :src="user.imgUrl"/>
                <section class="details flex-col flex-between">
                    <div class="user-details">
                        <h2>Name: {{user.fullName}}</h2>
                        <h2>Email: {{user.email}}</h2>
                    </div>
                    <div class="user-details-btns flex flex-between">
                        <router-link to='/item/edit'><button class="add-btn btn">Add Item</button></router-link>
                        <button class="contact-btn btn">Contact Me</button>
                    </div>
                </section>     
            </section>    
        </section>
        <section class="details-items-container flex-col">
            <h2>{{itemsFilter}} items:</h2>
            <button class="available-btn btn" @click="itemsFilter = 'available'">Available Items</button>
            <button class="sold-btn btn" @click="itemsFilter = 'sold'">Sold Items</button>
            <!-- TODO: render order button only if user is loggedInUser -->
            <button class="order-btn btn" @click="itemsFilter = 'In process'">Incoming Orders</button> 
            <section class="user-item flex-row flex-wrap">
                <item-preview v-for="item in userItems" :key="item._id" :item="item">
                    <button class="btn" v-if="itemsFilter === 'In process'" @click="markAsSold(item)">Approve sell</button>
                </item-preview>
=======
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
>>>>>>> c98d1d194be817f75a4a6a3a2c4b394ef6c951e7
            </section>
            <h1 class="sold-msg" v-if="this.msg">{{msg}}</h1>
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
            itemsFilter: 'available',
            msg: ''
        }
    },
    created(){
<<<<<<< HEAD
        this.userId = this.$route.params.id
        this.$store.dispatch({type: 'loadUser', userId: this.userId })
=======
        const userId = this.$route.params.id
        this.$store.dispatch({type: 'loadUser', userId })
        console.log("UserId: ", userId)
>>>>>>> c98d1d194be817f75a4a6a3a2c4b394ef6c951e7
    },
    methods:{
        async markAsSold(item){
            const soldItem = {...item}
            soldItem.status = 'sold'
            await this.$store.dispatch({type: 'saveItem', item: soldItem, user: this.user })
            // this.$store.dispatch({type: 'setMsg', msg: 'Item sold!!' })            
            this.msg = 'Item Sold!!'
            console.log('sold item - ', soldItem, 'user:', this.user);
            
        }
    },
    computed:{
        user(){
            return this.$store.getters.user
        },
<<<<<<< HEAD
        userItems(){            
            return this.$store.getters.items.filter(item => {
                return item.owner._id === this.userId &&
                        item.status === this.itemsFilter
                })
=======
        userItems(){
            var items = this.$store.getters.items.filter(item => item.owner._id === this.userId)
            console.log("ITEM: ", items)
            return items
>>>>>>> c98d1d194be817f75a4a6a3a2c4b394ef6c951e7
        },
    },
    components:{
        ItemPreview
    },
}
</script>
