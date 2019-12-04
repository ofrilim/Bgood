<template>
    <section v-if="item" class="item-details">
        <div class="item-details-main flex">
            <div>
                <img  class="img-details" :src="this.item.imgUrl"/>
            </div>
            <div class="details-content">
                <h1 class="details-title">{{item.name}}</h1>
                <div class="">
                    <div class="details-btns">
                        <button class="btn" @click="buyItem">BUY</button>
                        <i class="fa fa-heart preview-heart pointer" title="Add To WishList" @click.stop="addToWishList(item._id)"></i>
                    </div>
                    <h3><span class="bold">Category: </span>{{item.category}}</h3>
                    <h3><span class="bold">Condition: </span>{{item.condition}}</h3>
                    <h3><span class="bold">Status: </span>{{item.status}}</h3>
                    <h3><span class="bold">Uploaded at: </span>{{item.createdAt}}</h3>
                    <h3><span class="bold">Price: $ </span>{{item.price}}</h3>
                    <h4><span class="bold">Additional information: </span>{{item.description}}</h4>
                </div>
                <div class="">
                    <div class="">
                    <router-link :to="`/user/${item.owner._id}`"><span class="bold">Seller: </span>{{item.owner.name}}
                        <img :src="item.owner.imgUrl" class="avatar-img"/>
                    </router-link> 
                    </div>
                    <div>
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
            const baughtItem = {...this.item}
            baughtItem.status = "In process" 
            await this.$store.dispatch({type: 'saveItem', item: baughtItem})
            this.$store.dispatch({type: 'setMsg', msg: 'Item reserved successfully'})
        },
    },
    computed: {
        msg(){
            return this.$store.getters.msg
        }
    },   
}
</script>