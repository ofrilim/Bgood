<template>
    <section v-if="item" class="item-details flex-col">
        <div class="item-details-main flex justify-center">
            <img :src="this.item.imgUrl" class="ratio-16-9 img-details radius"/>
            <div class="details-content container flex-col">
                <h1 class="item-title center">{{item.name}}</h1>
                <div class="flex flex-between">
                    <h3 ><span>Category : </span>{{item.category}}</h3>
                    <button class="btn" @click="buyItem">BUY</button>
                </div>
                <h3><span>Condition : </span>{{item.condition}}</h3>
                <h3><span>Status : </span>{{item.status}}</h3>
                <h3><span>Uploaded at : </span>{{item.createdAt}}</h3>
                <br>
                <h3><span>Price : </span>${{item.price}}</h3>
                <br>
                <br>
                <h4><span>Additional information : </span>{{item.description}}</h4>
                <div class="item-details-owner flex flex-between">
                    <router-link :to="`/user/${item.owner._id}`"><span>Uploaded by : </span>{{item.owner.name}}</router-link> 
                    <img :src="item.owner.imgUrl" class="avatar-img"/>
                    <router-link :to="`/item/edit/${item._id}`"><button class="btn">Edit Item</button></router-link>
                    <button @click="removeItem(item._id)" class="btn">Delete</button>
                </div>
            </div>
        </div>
        <div>
            <button @click="addToWishList(item._id)"><span class="heart"></span></button>
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
