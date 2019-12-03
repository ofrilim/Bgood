<template>
    <section class="user-details grid" v-if="user">
        <!-- <h1>{{user.fullName}}'s Page</h1> -->
        <section class="user-section">
            <div class="user-details-content flex flex-col flex-around">
                <img class="user-img" :src="user.imgUrl"/>
                <h1>{{user.firstName}}'s Boutique</h1>      
                <section class="user-info">
                    <h2><i class="fa fa-user"></i>{{user.fullName}}</h2>
                    <h2><i class="fa fa-envelope"></i>{{user.email}}</h2>
                </section>
                <div class="btns">
                    <router-link to='/item/edit'><button class="btn">Add Item</button></router-link>
                    <button class="btn">Contact Me</button>
                </div>
            </div>
        </section>
        <section class="items-section">
            <!-- <h1>{{itemsFilter}} items:</h1> -->
            <div class="btns">
                <button class="btn" @click="itemsFilter = 'available'">Available Items</button>
                <button class="btn" @click="itemsFilter = 'sold'">Sold Items</button>
                <!-- TODO: render order button only if user is loggedInUser -->
                <button class="btn" @click="itemsFilter = 'In process'">Incoming Orders</button>
            </div>
            <section class="items grid">
                <item-preview v-for="item in userItems" :key="item._id" :item="item">
                    <button class="btn" v-if="itemsFilter === 'In process'" @click="markAsSold(item)">Approve sell</button>
                </item-preview>
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
            return this.$store.getters.user
        },
        userItems(){            
            return this.$store.getters.items.filter(item => {
                return item.owner._id === this.userId &&
                        item.status === this.itemsFilter
                })
        },
    },
    components:{
        ItemPreview
    },
}
</script>
