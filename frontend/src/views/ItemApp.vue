<template>
    <section class="item-app">
        <ItemList :items="items"/>
    </section>
</template>

<script>
import ItemList from '@/components/ItemList.vue'

export default {
    name: 'item-app',
    data(){
        return {
            // items: [],
        }
    },
    components:{
        ItemList
    },
    computed:{
        items(){
            return this.$store.getters.items
        }
    },
    created(){
        this.$store.dispatch('loadItems')
        // console.log('app items:', items);
    }
}
</script>