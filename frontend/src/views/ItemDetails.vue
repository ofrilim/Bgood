<template>
    <section v-if="item" class="item-details container flex">
        <!-- <h1>item-details - </h1> -->
        <!-- <img src="../assets/loading.gif" class="loading-img"/> -->
        <img :src="this.item.imgUrl" class="ratio-16-9 img-details"/>
        <section class="details-content container">
            <h1>{{item.name}}</h1>
            <h3>Price: ${{item.price}}</h3>
            <h3>Category: {{item.category}}</h3>
            <h3>Publishe at: {{item.createdAt}}</h3>
            <h3>Condition: {{item.condition}}</h3>
            <h3>Status: {{item.status}}</h3>
            <h3>Additional information: {{item.description}}</h3>
            <button class="btn" @click="addToWishList(item._id)"><i class="fa fa-heart"></i></button>
            <button class="btn" @click="buyItem">BUY</button>
            <br>
            <section class="seller-info container flex justify-center align-center">
                <!-- <img :src="user.userImg"/> -->
                <img :src="item.owner.imgUrl" class="avatar-img"/>
                <router-link :to="`/user/${item.owner._id}`">Uploaded by: {{item.owner.name}}</router-link> 
            </section>

            <h1 class="buy-msg" v-if="this.msg">{{msg}}</h1>
            <br>
            <router-link class="btn" :to="`/item/edit/${item._id}`"><button>Edit Item</button></router-link>
            <button class="btn" @click="removeItem(item._id)">Delete Item</button>
        </section>
    </section>
</template>

<script>
// import store from '../store/index.js'

export default {
    name: 'item-details',
    data(){
        return {
            msg: '',
            // status: 'available'
        }
    },
    methods: {
        async buyItem() {
            const item = {...this.item}
            item.status = "In process" 
            await this.$store.dispatch({type: 'buyItem', item})
            this.msg = 'Item reserved successfully'
        },
        async getCurrItem(){
            const itemId = this.$route.params.id
            this.$store.commit({type: 'setCurrItem', itemId})
            this.item = await this.$store.getters.item
            console.log('details item:', this.item);
        },
        addToWishList(itemId) {
            this.$store.commit('setWishCount', itemId) // will be assigned to totalCount + diff
            this.$store.commit('addToWishList', this.item) // will be assigned to loggedinUser + diff

            this.$store.dispatch({type: 'setMsg', msg: 'Item added successfully'})
        },
        async removeItem(itemId){
            console.log('item id:', itemId);
            await this.$store.dispatch({type: 'removeItem', itemId})
            this.$router.push('/item/')
        }
    },
    computed: {
        item() {
            return this.$store.getters.item
        },

        //  addToWishList(itemId) {
        //     console.log("item._id - itemDetails: ", this.item._id)
        //     this.$store.commit('setWishCount', itemId) // will be assigned to totalCount + diff
        //     this.$store.commit('addToWishList', this.item) // will be assigned to loggedinUser + diff
        //     this.$store.dispatch({type: 'setMsg', msg: 'Item added successfully'})

        
    },
    created(){
        this.$store.dispatch({type: 'loadItem', itemId: this.$route.params.id})
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