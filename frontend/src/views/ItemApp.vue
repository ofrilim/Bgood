<template>
    <section class="item-app">
        <ItemList :items="items" @addToWishList="addToWishList"/>
    </section>
</template>

<script>
import ItemList from '@/components/ItemList.vue'

export default {
    name: 'item-app',
    components:{
        ItemList
    },
    methods: {
        addToWishList(itemId) {    
            this.$store.dispatch('addToWishList', itemId);
        }
    },
    computed:{
        items(){
            return this.$store.getters.items
        }
    },
}
</script>