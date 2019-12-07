<template>
    <section>
        <ul class="grid-container">
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
        addItemToWishList(itemId){       // TODO: WISH LIST - HILA
            this.$emit('addToWishList', itemId)
        }
    }
}
</script>
   