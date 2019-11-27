<template>
    <section>
        <h1>B-good Full List</h1>
        <ul>
            <ItemPreview v-for="currItem in items" :key="currItem._id" :item="currItem"></ItemPreview>
            <!-- <li v-for="item in items" :key="item._id" >{{item.name}}</li> -->
        </ul>

    </section>
</template>


<script>   
import ItemPreview from "@/components/ItemPreview.vue";

export default {
    props: ['items'],
    components: {
        ItemPreview
    },
    created() {
        // console.log('items: ', items)
    }
}
</script>
   