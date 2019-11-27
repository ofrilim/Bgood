<template>
    <section class="item-details">
        <h1>item-details - </h1>
        <pre>{{this.item}}</pre>
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