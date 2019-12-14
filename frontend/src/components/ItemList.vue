<template>
    <section>
        <ul class="flex flex-wrap flex-evenly">
            <ItemPreview v-for="currItem in items" :key="currItem._id" :item="currItem" @addToWishList="addItemToWishList">
            </ItemPreview>
        </ul>
    </section>
</template>

<script>   
import ItemPreview from "@/components/ItemPreview.vue";

export default {
    name:'ItemList',
    props: ['items'],
    components: {
        ItemPreview
    },
    methods: {
        // addItemToWishList(itemId){       // TODO: WISH LIST - HILA
        addItemToWishList(item){       // TODO: WISH LIST - HILA
            this.$emit('addToWishList', item)
            // this.$emit('addToWishList', itemId)
        }
    }
}
</script>
   