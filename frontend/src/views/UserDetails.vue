<template>
    <section class="user-details" v-if="user">
        <h2>{{user.username}}'s Page</h2>
        <img :src="user.imgUrl"/>
        <section class="user-items">
            <!-- <item-preview v-for="item in items" :key="item._id" :item="item" > -->
                <!-- <h1>{{item.name}}</h1>
                <img :src="item.imgUrl"/> -->
            <!-- </item-preview> -->
        </section>
        <section class="user-wishlist-items"></section>
        <pre>{{user}}</pre>
    </section>
</template>

<script>
// user sees wishlist items if userId===params.id
// user sees items for sale if userId!==params.id

import store from '../store/index.js'
import ItemPreview from '../components/ItemPreview.vue'

export default {
    name: 'user-details',
    store: store,
    computed:{
        user(){
            return this.$store.getters.user
        }
    },
    created(){
        const userId = this.$route.params.id
        this.$store.dispatch({type: 'loadUser', userId})
    },
    components:{
        ItemPreview
    },
}
</script>

<style lang="scss" scoped>
    .wishlist-item{
        width: 200px;
        height: 400px;
    }
</style>