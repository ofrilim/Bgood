<template>
    <section class="item-app">
        <ItemList :items="items" @addToWishList="addItem"/>
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
        addItem(id) {
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