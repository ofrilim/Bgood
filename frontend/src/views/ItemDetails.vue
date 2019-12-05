<template>
    <section v-if="item" class="item-details">
        <div class="item-details-main flex">
            <div class="">
                <img class="img-details" :src="this.item.imgUrl"/>
            </div>
            <div class="details-title-content">
                <section class="flex flex-between align-center">
                    <i class="fa fa-heart pointer" v-if="!isOwner" title="Add To WishList" @click.stop="addToWishList(item._id)"></i>
                    <h1 class="details-title bold inline">{{item.name}}</h1>
                    <button class="btn action-buy" v-if="!isOwner" @click="buyItem">BUY</button>
                </section>
                <div class="details-content-box">
                    <h3><span class="bold">Category: </span>{{item.category}}</h3>
                    <h3><span class="bold">Condition: </span>{{item.condition}}</h3>
                    <!-- <h3><span class="bold">Uploaded at: </span>{{item.createdAt}}</h3> -->
                    <h3><span class="bold">Price: $ </span>{{item.price}}</h3>
                    <h4><span class="bold">Additional information: </span>{{item.description}}</h4>
                    <h3><span class="bold alert" v-if="item.status==='In process' || item.status==='sold'">Someone is interested in this item</span></h3>
                    <h3><span class="bold success" v-if="item.status === 'available'">Item is available</span></h3>
                </div>
                <div class="">
                    <div class="details-footer-content" v-if="!isOwner">
                    <router-link :to="`/user/${item.byUser._id}`">
                        <span class="bold">Seller: {{item.byUser.fullName}}</span>
                        <img :src="item.byUser.imgUrl" class="avatar-img"/>
                    </router-link> 
                    </div>
                    <div class="details-footer-content" v-if="isOwner">
                        <router-link :to="`/item/edit/${item._id}`"><button class="btn">Edit Item</button></router-link>
                        <button @click="removeItem(item._id)" class="btn">Delete</button>
                    </div>
                </div>
            </div>
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
            isOwner: false
        }
    },
     async created(){
            this.itemId = this.$route.params.id
            await this.$store.dispatch({type: 'loadItem', itemId: this.itemId})
            this.item = this.$store.getters.item
            const loggedInUser = this.$store.getters.loggedInUser
            if (loggedInUser) this.isOwner = (loggedInUser._id === this.item.ownerId)
    },
    methods:{
        addToWishList(itemId) {
            console.log('ITEMDETAILS, ID ', itemId)
            // this.$store.dispatch('addToWishList', itemId)
            // // this.$store.commit('setWishCount', itemId) // will be assigned to totalCount + diff
            // this.$store.commit('addToWishList', this.item) // will be assigned to loggedinUser + diff
            // this.$store.dispatch({type: 'setMsg', msg: 'Item added successfully'})
        },
        async removeItem(itemId){
            await this.$store.dispatch({type: 'removeItem', itemId})
            this.$router.push('/item/')
        },
         async buyItem() {
            var user = this.$store.getters.loggedInUser;
            const baughtItem = JSON.parse(JSON.stringify(this.item));
            baughtItem.buyer = user._id;
            baughtItem.status = "In process";
            const savedItem = await this.$store.dispatch({type: 'saveItem', item: baughtItem});
            console.log('item details saved item:', savedItem);
            
            this.$store.dispatch({type: 'setMsg', msg: 'Item reserved successfully'});
        },
    },
    // computed: {
    //     msg(){
    //         return this.$store.getters.msg
    //     },
    // },   
}
</script>