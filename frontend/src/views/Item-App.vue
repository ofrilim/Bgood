<template>
    <section class="item-app">

    </section>
</template>

<script>
export default {
    name: 'item-app',
    data(){
        return {
            items: [],
        }
    },
    created(){
        // this.$store.dispatch('loadItems')
        this.items = this.$store.getters.items
        console.log('app items:', this.items);
    }
}
</script>