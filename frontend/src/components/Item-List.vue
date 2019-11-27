<template>
    <section>
    <router-link to="/">Home</router-link>
        <h1>B-good Full List</h1>
    </section>
</template>


<script>   
import ItemPreview from "@/components/ItemPreview.vue";

export default {
    props: ['items'],
    data() {
        return {
            item: {},
        }
    },
    methods: {
        // removeItem(item) {
        //     console.log('remove - list ,', item._id);
        //     this.$emit('removeItem', itemy._id)
        // }
    },
    components: {
        ItemPreview
    },
}
</script>
   