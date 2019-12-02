<template>
    <section class="user-details" v-if="user">
        <h2>{{user.firstName}}'s Page</h2>
        <router-link to='/item/edit'><button class="add-btn btn">Add Item</button></router-link>
        <section class="user-items flex">
            <section class="user-item flex flex-wrap">
                <item-preview v-for="item in userItems" :key="item._id" :item="item" ></item-preview>
            </section>            
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
        }
    },
     created(){
        const userId = this.$route.params.id
        this.$store.dispatch({type: 'loadUser', userId })
    },
    computed:{
        user(){
            return this.$store.getters.user
        },
        userItems(){
            var items = this.$store.getters.items.filter(item => item.owner._id === this.userId)
            return items
        }
    },
    components:{
        ItemPreview
    },
}
</script>
