<template>
    <section>
        <ul class="grid-container">
            <ItemPreview v-for="currItem in items" :key="currItem._id" :item="currItem">
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
    created() {
        // console.log('items: ', items)
    }
}
</script>
   