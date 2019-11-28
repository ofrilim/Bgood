<template>
    <section class="item-container">
        <router-link :to="`/item/${item._id}`">
        <li class="preview-container item-preview center">
            <!-- <section > -->
                <h2>{{item.name}}</h2>
                <img class="img-prev" :src="item.imgUrl"/>
                <h3>Price: ${{item.price}}</h3>
                <h3>Seller: {{item.owner.name}}</h3> 
                <img class="avatar-img" :src="item.owner.imgUrl"/>
                <button @click="addToWishList(item._id)"><i class="fa fa-heart"></i></button>
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
        addToWishList(itemId) {
            this.$emit('addToWishList', itemId)
            this.$emit('addToWishList', itemId)
        },
//     components: {
//         // ItemDetails
    },
}
</script>
   