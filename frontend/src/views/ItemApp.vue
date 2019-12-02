<template>
    <section class="item-app">
        <ItemList :items="items"/>
    </section>
</template>

<script>
import ItemList from '@/components/ItemList.vue'

export default {
    name: 'item-app',
    components:{
        ItemList
    },
    computed:{
        items(){
            return this.$store.getters.items
        }
    },
}
</script>