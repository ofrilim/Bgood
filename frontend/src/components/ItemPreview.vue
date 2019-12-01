<template>
    <section class="item-container">
        <li class="preview-container item-preview center">
                <h2>{{item.name}}</h2>
                <router-link :to="`/item/${item._id}`">
                    <img class="img-prev" :src="item.imgUrl"/>
                </router-link>
                <h3>Price: ${{item.price}}</h3>
                <router-link :to="`/user/${item.owner._id}`">Seller: {{item.owner.name}}</router-link> | 
                <!-- <h3>Seller: {{item.owner.name}}</h3>  -->
                <img class="avatar-img" :src="item.owner.imgUrl"/>
                <button @click="addToWishList(item._id)"><i class="fa fa-heart"></i></button>
        </li>
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
   