<template>
    <section class="item-details">
        <h1>item-details - </h1>
        <!-- {{this.item.name}} -->
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
    created(){
        this.$store.commit('setCurrItem', this.$route.params.id)
        this.item = this.$store.getters.item
        console.log('item:', this.item);
        


    }
}
</script>