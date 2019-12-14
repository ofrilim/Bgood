<template>
    <section v-if="item">
        <div class="item-details grid">
            <div class="">
                <img class="img-details" :src="this.item.imgUrl"/>
            </div>
            <div class="details-title-content">
                <section class="flex flex-between align-center caps">
                    <i class="fa fa-heart pointer" v-if="!isOwner" title="Add To WishList" @click.prevent="addToWishList(item._id)"></i>
                    <h1 class="details-title bold inline">{{item.name}}</h1>
                    <button class="btn action-buy" v-if="!isOwner" @click="buyItem">BUY</button>
                </section>
                <div class="details-content-box">
                    <h3 class="caps"><span>Category: </span>{{item.category}}</h3>
                    <h3 v-if="item.category==='clothes' || item.category==='shoes'"><span class="">Size: </span>{{item.size}}</h3>
                    <h3 class="caps"><span class="">Condition: </span>{{item.condition}}</h3>
                    <h3><span class="">Uploaded at: </span>{{createdAtDate}}</h3>
                    <h3><span class="">Price: $ </span>{{item.price}}</h3>
                    <h4><span class="">Additional information: </span>{{item.description}}</h4>
                    <h3><span class="alert" v-if="item.status==='in process'">Someone is interested in this item</span></h3>
                    <h3><span class="success" v-if="item.status === 'available'">Item is available</span></h3>
                    <h3><span class="primary" v-if="item.status === 'sold'">{{item.byUser.firstName}} had sold the {{item.name}}</span></h3>    
                </div>
                <div class="">
                    <div class="details-footer-content caps" v-if="!isOwner">
                    <router-link :to="`/user/${item.byUser._id}`">
                        <span class="bold">Seller: {{item.byUser.fullName}}</span>
                        <img :src="item.byUser.imgUrl" class="avatar-img"/>
                    </router-link> 
                    </div>
                    <div class="details-footer-content caps" v-if="isOwner">
                        <router-link :to="`/item/edit/${item._id}`"><button class="btn">Edit Item</button></router-link>
                        <button @click="removeItem(item._id)" class="btn">Delete</button>
                    </div>
                </div>
            </div>
            <div class="interest-items caps">
                <h1>Related Products</h1>
                 <ul class="interest-ul">
                     <li class="grid" v-for="item in itemsToShow" :key="item._id">
                        <router-link :to="`/item/${item._id}`"><img :src="item.imgUrl"/></router-link>
                        <div class="similar-content flex flex-col flex-around">
                            <h2>{{item.name}}</h2>
                            <h2 class="price">$ {{item.price}}</h2>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script>
import UtilsService from '../services/UtilsService';
import ItemService from '../services/ItemService';
import SocketService from '../services/SocketService';

export default {
    name: 'item-details',
    data() {
        return {
            item: null,
            itemId: null,
            isOwner: false,
            createdAtDate: '',
            itemsToShow: [],
            isInProcess: false
        }
    },
    async created() {
        this.itemId = this.$route.params.id; 
        this.item = await ItemService.getById(this.itemId);
        this.setItems()
        this.createdAtDate = UtilsService.timeStampToString(this.item.createdAt)           
        const loggedInUser = this.$store.getters.loggedInUser;
        if (loggedInUser) this.isOwner = (loggedInUser._id === this.item.ownerId) 
    },
    watch:{
    async '$route'() {
        this.itemId = this.$route.params.id; 
        this.item = await ItemService.getById(this.itemId);
        this.setItems()
        this.createdAtDate = UtilsService.timeStampToString(this.item.createdAt)           
        const loggedInUser = this.$store.getters.loggedInUser;
        if (loggedInUser) this.isOwner = (loggedInUser._id === this.item.ownerId) 
        }
    },
    methods: {
        addToWishList(itemId) {    
             if (this.isInProcess) return
            this.isInProcess = true
            this.$store.dispatch({type:'setOnWishList', itemId});
            setTimeout(() => {
                this.isInProcess = false
            }, 800); 
        },
        async removeItem(itemId) {
            await this.$store.dispatch({type: 'removeItem', itemId})
            this.$router.push('/item/')
        },
        async buyItem() {
            var user = this.$store.getters.loggedInUser; 
            const baughtItem = JSON.parse(JSON.stringify(this.item));
            baughtItem.buyer = user._id;
            baughtItem.status = 'in process';
            try {
                await this.$store.dispatch({type: 'saveItem', item: baughtItem});
                this.$store.dispatch({type: 'setMsg', msg: 'Item reserved successfully. Order sent to seller'});
                SocketService.emit('newMsg', 'ITEM SUCCESSFULLY ORDERED')
            }
            catch (error) {
                console.error('ERROR: ITEMDETAILS BUYITEM FAILED error: ', error)
                this.$store.dispatch({type: 'setMsg', msg: 'Item order failed. Try again later'});
            }
        },
        async setItems(){
            var filterBy = {}
            filterBy = { 
                category: this.item.category,
                keywords: this.item.keywords
            }
            await this.$store.dispatch({type: 'loadItems', filterBy})
            this.itemsToShow = this.$store.getters.items.filter(item => item._id !== this.itemId).slice(0,4)
        },
    },
}
</script>