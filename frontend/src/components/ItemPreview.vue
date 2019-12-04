<template>
    <section>
        <li class="preview">
            <router-link :to="`/item/${item._id}`">
                <img class="img-preview" :src="item.imgUrl"/>
            </router-link>
            <i class="fa fa-heart" @click="addToWishList(item._id)"></i>
            <div class="preview-content flex flex-col">
                <h2 class="preview-name bold">{{item.name}}</h2>
                <div class="flex flex-between">
                    <h2>Price:  {{item.price}} $</h2>
                </div>
                <router-link :to="`/user/${item.owner._id}`">
                <div class="flex align-center">
                    <img class="avatar-img pointer" :src="item.owner.imgUrl"/>
                    <small class="by">By: {{item.owner.fullName}}</small>
                </div>
                </router-link>
            <slot></slot>
            </div>
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
        },
    },
}
</script>
   