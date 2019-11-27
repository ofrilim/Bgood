
<template>
    <section>

        <li class="item-preview">
            {{item.name}}
            <!-- <h2>Item's name: {{item.name}}</h2>
            <img src="item.imgUrl">
            <h3>Price: {{item.price}}</h3>
            <h3>Seller: {{item.owner.name}}</h3>
            <h3>{{item.owner.imgUrl}}</h3>

            <button @click="addToWishList(item._id)">like</button>
            
            <button @click="itemDetails(item._id)">
            <router-link :to="'/item/'+item._id">Details</router-link> -->
            <!-- </button> -->
        </li>
    </section>
</template>


<script> 
export default {
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
   