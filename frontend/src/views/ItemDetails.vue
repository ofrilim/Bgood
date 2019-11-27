<template>
    <section v-if="item" class="item-details flex">
        <!-- <h1>item-details - </h1> -->
        <img :src="this.item.imgUrl" class="item-img"/>
        <section class="details-content">
            <h1>{{this.item.name}}</h1>
            <h2>{{this.item.description}}</h2>
            <h2>{{this.item.size}}</h2>
            <section class="seller-info flex justify-center align-center">
                <img :src="this.item.owner.imgUrl" class="seller-img"/>
                <p>{{this.item.owner.name}}</p>
            </section>
            <h3>{{this.item.price}}</h3>
        </section>
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
    },
    created(){
        this.getCurrItem();
    }
}
</script>
<style lang="scss" scoped>
    .item-img{
        width: 35%;
    }
    .seller-info{
        width: 100%;
    }
    .seller-img{
        width: 55px;
        border-radius: 40px;
    }
</style>