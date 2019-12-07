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
        addToWishList(id) {  // TODO: CONTINUE THE FLOW- HOPE WIE CAN ADD ITEMS TO WISHlIST AT THE END
            console.log('ITEMAPP item is: ', id)
        }
    },
    computed:{
        items(){
            return this.$store.getters.items
        }
    },
}
</script>