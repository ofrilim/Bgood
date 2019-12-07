<template>
    <section class="item-app">
        <ItemList :items="items" @addToWishList="addItemToWishList"/>
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
        addItemToWishList(itemId) {
            console.log('ITEMAPP item is: ', itemId)
            this.$store.dispatch({type: 'addToWishList', itemId})
        }
    },
    computed:{
        items(){
            return this.$store.getters.items
        }
    },
}
</script>