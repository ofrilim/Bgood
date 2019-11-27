<template>
    <section v-if="item" class="item-details container flex">
        <!-- <h1>item-details - </h1> -->
        <img :src="this.item.imgUrl" class="item-img"/>
        <section class="details-content container">
              <h3>Price: ${{item.price}}</h3>
                <h3>Category: {{item.category}}</h3>
                <h3>Publishe at: {{item.createdAt}}</h3>
                <h3>Condition: {{item.condition}}</h3>
                <h3>Status: {{item.status}}</h3>
                <h3>Additional information: {{item.description}}</h3>
            <section class="seller-info container flex justify-center align-center">
                <img :src="item.owner.imgUrl" class="seller-img"/>
                <p>seller: {{item.owner.name}}</p>
            </section>
            <h3>{{this.item.price}}</h3>
            <button>like</button>
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
        width: auto;
        height: 85vh;
        padding: 10px;
    }
    .seller-info{
        width: 100%;
    }
    .seller-img{
        width: 55px;
        border-radius: 40px;
    }
</style>