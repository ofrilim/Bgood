<template>
    <section class="item-app">
        <ItemList :items="items" @addToWishList="addItemToWishList"/>
        <!-- <ItemList :items="items" @addToWishList="addItemToWishList"/> -->
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
        addItemToWishList(itemId) { // TODO: CONTINUE THE FLOW- HOPE WIE CAN ADD ITEMS TO WISHlIST AT THE END
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