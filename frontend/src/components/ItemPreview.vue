
<template>
    <section class= "item-container">
        <router-link :to="`/item/${item._id}`">
        <li class="preview-container item-preview">
            <!-- <section > -->
                <h2>{{item.name}}</h2>
                <img class="img-prev" :src="item.imgUrl">
                <h3>Price: ${{item.price}}</h3>
                <h3>Seller: {{item.owner.name}}</h3> 
                <h3>{{item.owner.imgUrl}}</h3>

                <button>like</button>
                <!-- <button @click="addToWishList(item._id)">like</button> -->
                <!-- <button >Details</button> -->
                <!-- <button @click="itemDetails(item._id)"> -->

                <!-- <router-link :to="'/item/'+item._id">Details</router-link> -->
                <!-- </button> -->
            <!-- </section> -->
        </li>
        </router-link>
    </section>
</template>


<script> 
export default {
    name:'ItemPreview',

    props: ['item'],
    computed: { // Sends the data back to the STORE-ACTIONS
    },

    methods: {
        // async addToWishList(itemId) {
        //     await this.$store.commit('addToWishList', itemId)
            // this.$store.dispatch({type: 'setMsg', msg: 'New item added!'})
        // },

        // removeItem(itemId) {
        //     this.$emit('removeItem', itemId)
        // },
        // AddItem(itemId) {
        //     this.$emit('removeItem', itemId)
        // },
//     },
//     components: {
//         // ItemDetails
    },
}
</script>
   