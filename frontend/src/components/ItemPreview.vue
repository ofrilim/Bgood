<template>
    <li class="preview caps">
        <router-link :to="`/item/${item._id}`">
            <i class="fa fa-heart preview-heart" @click.prevent="addToWishList(item)"><span v-if="item.wishCount">{{item.wishCount}}</span></i>
            <div class="img-hover">
                <img class="img-preview" :src="item.imgUrl"/>
            </div>
        </router-link>
        <div class="preview-content flex flex-col flex-around">
            <h2 class="preview-name bold">{{item.name}}</h2>
            <div v-if="item.byUser" class="preview-price flex flex-col flex-between">
                <div class = "preview-seller-mobile">
                    <h2>Price: $ {{item.price}}</h2>
                </div>
                <div>
                    <router-link :to="`/user/${item.byUser._id}`">
                        <div class="by-main flex align-center">
                            <img class="avatar-img pointer" :src="item.byUser.imgUrl"/>
                            <small class="by">By: {{item.byUser.fullName}}</small>
                        </div>
                    </router-link>
                </div>
            </div>
            <div v-if="item.buyerInfo">
                <router-link  :to="`/user/${item.buyerInfo._id}`">
                    Ordered By: {{item.buyerInfo.fullName}}
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
    data(){
        return {
            isInProcess: false      
        }
    },
    methods: {
        addToWishList(item) {
            if (this.isInProcess) return;
            this.isInProcess = true;
            this.$emit('addToWishList', item)
            setTimeout(() => {
                this.isInProcess = false
            }, 800); 
        },
    },
}
</script>