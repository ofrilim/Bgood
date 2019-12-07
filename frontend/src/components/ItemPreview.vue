<template>
    <li class="preview">
        <router-link :to="`/item/${item._id}`">
            <i class="fa fa-heart preview-heart" @click.stop="addToWishList(item._id)"></i>
            <div class="img-hover">
                <img class="img-preview" :src="item.imgUrl"/>
            </div>
        </router-link>
        <div class="preview-content flex flex-col flex-around">
            <h2 class="preview-name bold">{{item.name}}</h2>
            <div class="preview-price flex flex-between">
                <h2>Price: $ {{item.price}}</h2>
            </div>
            <div v-if="item.byUser">
                <router-link :to="`/user/${item.byUser._id}`">
                    <div class="flex align-center">
                        <img class="avatar-img pointer" :src="item.byUser.imgUrl"/>
                        <small class="by">By: {{item.byUser.fullName}}</small>
                    </div>
                </router-link>
            </div>
            <slot></slot>
        </div>
    </li>
</template>

<script> 
export default {
    name:'ItemPreview',
    props: ['item'],
    methods: {
        addToWishList(itemId) {
            console.log('hi')
            this.$emit('addToWishList', itemId)
        },
    },
}
</script>
   