<template>
    <section>
        <h1>B-good Full List</h1>
        <ItemPreview v-for="item in items" :key="item._id" ></ItemPreview>
    </section>
</template>


<script>   
import ItemPreview from "@/components/ItemPreview.vue";

export default {
    props: ['items'],
    components: {
        ItemPreview
    },
    // created() {
    //     console.log('items: ', this.items)
    // }
}
</script>
   