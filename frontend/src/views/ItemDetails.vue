<template>
    <section v-if="item" class="item-details container flex">
        <!-- <h1>item-details - </h1> -->
        <!-- <img src="../assets/loading.gif" class="loading-img"/> -->
        <img :src="this.item.imgUrl" class="ratio-16-9"/>
        <section class="details-content container">
            <h1>{{item.name}}</h1>
            <h3>Price: ${{item.price}}</h3>
            <h3>Category: {{item.category}}</h3>
            <h3>Publishe at: {{item.createdAt}}</h3>
            <h3>Condition: {{item.condition}}</h3>
            <h3>Status: {{item.status}}</h3>
            <h3>Additional information: {{item.description}}</h3>
            <section class="seller-info container flex justify-center align-center">
                <img :src="item.owner.imgUrl" class="avatar-img"/>
                <router-link :to="`/user/${item.owner._id}`">Seller: {{item.owner.name}}</router-link>
            </section>
            <h3>{{item.price}}</h3>
            <button @click="addToWishList(item._id)"><i class="fa fa-heart"></i></button>
            <router-link :to="`/item/edit/${item._id}`"><button>Edit Item</button></router-link>
            <button @click="removeItem(item._id)">Delete</button>
            <!-- <button @click="addItem">Add Item</button> -->
        </section>
        <!-- <pre>{{this.item}}</pre> -->
    </section>
</template>

<script>
// import store from '../store/index.js'

export default {
    name: 'item-details',
    data(){
        return {
            item: null,
        }
    },
    methods:{
        async getCurrItem(){
            const itemId = this.$route.params.id
            this.$store.commit({type: 'setCurrItem', itemId})
            this.item = await this.$store.getters.item
            console.log('item:', this.item);
        },
        addToWishList(itemId) {
            this.$store.commit('setWishCount', itemId) // will be assigned to totalCount + diff
            this.$store.commit('addToWishList', this.item) // will be assigned to currUser + diff

            this.$store.dispatch({type: 'setMsg', msg: 'Item added successfully'})
        },
        async removeItem(itemId){
            console.log('item id:', itemId);
            await this.$store.dispatch({type: 'removeItem', itemId})
            this.$router.push('/item/')
        }
    },
    created(){
            this.getCurrItem();
    }
}
</script>
<style lang="scss" scoped>
    .item-img{
        width: auto;
        height: 85vh;
        padding: 10px;
    }
    .seller-info{
        width: 100%;
    }
   
   
</style>