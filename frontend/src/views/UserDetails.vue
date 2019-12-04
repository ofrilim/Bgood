<template>
    <section class="user-details-container flex flex-around" v-if="user">
        <!-- <h1>{{user.fullName}}'s Page</h1> -->
        <section class="details-container flex flex-between">
            <section class="user-about flex flex-col justify-start align-center">
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
            <button class="available-btn btn" @click="itemsFilter = 'available'">Available Items</button>
            <button class="sold-btn btn" @click="itemsFilter = 'sold'">Sold Items</button>
            <!-- TODO: render order button only if user is loggedInUser -->
            <button class="order-btn btn" @click="itemsFilter = 'In process'">Incoming Orders</button> 
            <section class="user-item flex-row flex-wrap">
            <h2>{{itemsFilter}} items:</h2>
            <h1 class="sold-msg" v-if="this.msg">{{msg}}</h1>
                <item-preview v-for="item in userItems" :key="item._id" :item="item">
                    <button class="btn" v-if="itemsFilter === 'In process'" @click="markAsSold(item)">Approve sell</button>
                </item-preview>
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
            itemsFilter: 'available',
            msg: ''
        }
    },
    created(){
        this.userId = this.$route.params.id
        this.$store.dispatch({type: 'loadUser', userId: this.userId })
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
            console.log('user details user:', this.$store.getters.user);
            
            return this.$store.getters.user
        },
        userItems(){            
            var items = this.$store.getters.items
            // console.log('user own items details user:', user.ownItems);
            return items.filter(item => {
                return item.byUser._id === this.user._id &&
                        item.status === this.itemsFilter
                })
        },
    },
    components:{
        ItemPreview
    },
}
</script>
