<template>
    <section class="item-details">
        <h1>item-details - </h1>
         <li class="preview-container item-preview">
            <!-- <section > -->
                <h2>{{item.name}}</h2>
                <img class="img-details" :src="item.imgUrl">
                <h3>Price: ${{item.price}}</h3>
                <h3>Category: ${{item.category}}</h3>
                <h3>Publishe at: ${{item.createdAt}}</h3>
                <h3>Condition: ${{item.conditionS}}</h3>
                <h3>Status: ${{item.status}}</h3>
                <h3>Seller: {{item.owner.name}}</h3> 
                <h3>{{item.owner.imgUrl}}</h3>
                <h3>Additional information: {{item.description}}</h3>

                <button>like</button>
                <!-- <button @click="addToWishList(item._id)">like</button> -->
                <!-- <button >Details</button> -->
                <!-- <button @click="itemDetails(item._id)"> -->

                <!-- <router-link :to="'/item/'+item._id">Details</router-link> -->
                <!-- </button> -->
            <!-- </section> -->
        </li>
        
        
        
        <!-- <pre>{{this.item}}</pre> -->
    </section>
</template>

<script>
import store from '../store/index.js'

export default {
    name: 'item-details',
    store: store,
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
        // async getCurrItem(){
        //     const currItemId = this.$route.params.id
        //     this.$store.commit({type: 'setCurrItem', currItemId})
        //     this.item = await this.$store.getters.item
        //     console.log('item:', this.item);
        // },
    },
    created(){
        this.getCurrItem();
    }
}
</script>