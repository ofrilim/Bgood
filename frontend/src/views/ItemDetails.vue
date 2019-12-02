<template>
    <section v-if="item" class="item-details container flex">
        <img :src="this.item.imgUrl" class="ratio-16-9 img-details"/>
        <div class="details-content container">
            <h1>{{item.name}}</h1>
            <h3>Price: ${{item.price}}</h3>
            <h3>Category: {{item.category}}</h3>
            <h3>Publishe at: {{item.createdAt}}</h3>
            <h3>Condition: {{item.condition}}</h3>
            <h3>Status: {{item.status}}</h3>
            <h3>Additional information: {{item.description}}</h3>
            <div class="container">
                <router-link :to="`/user/${item.owner._id}`">Uploaded by: {{item.owner.name}}</router-link> 
                <br/>
                <img :src="item.owner.imgUrl" class="avatar-img"/>
            </div>
        </div>
        <div>
            <button @click="addToWishList(item._id)"><span class="heart"></span></button>
            <button class="btn" @click="buyItem">BUY</button>
            <router-link :to="`/item/edit/${item._id}`"><button>Edit Item</button></router-link>
            <button @click="removeItem(item._id)">Delete</button>
            <h1 class="buy-msg" v-if="this.msg">{{msg}}</h1>
        </div>
    </section>
</template>


<script>
export default {
    name: 'item-details',
    data() {
        return {
            item: null,
            itemId: null,
            msg: ''
        }
    },
     created(){
            this.itemId = this.$route.params.id
            this.$store.commit({type: 'setCurrItem', itemId: this.itemId})
            this.item = this.$store.getters.item
    },
    methods:{
        addToWishList(itemId) {
            this.$store.commit('setWishCount', itemId) // will be assigned to totalCount + diff
            this.$store.commit('addToWishList', this.item) // will be assigned to loggedinUser + diff
            this.$store.dispatch({type: 'setMsg', msg: 'Item added successfully'})
        },
        async removeItem(itemId){
            await this.$store.dispatch({type: 'removeItem', itemId})
            this.$router.push('/item/')
        },
         async buyItem() {
            const item = {...this.item}
            item.status = "In process" 
            await this.$store.dispatch({type: 'buyItem', item})
            this.msg = 'Item reserved successfully'
        }
    },   
}
</script>
