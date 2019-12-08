<template>
    <section class="item-app">
        <ItemList :items="items" @addToWishList="addItemToWishList"/>
        <ItemList :items="topWishCountItems" @addToWishList="addItemToWishList"/>
        <ItemList :items="lowestCostItems" @addToWishList="addItemToWishList"/>
        <ItemList :items="newItems" @addToWishList="addItemToWishList"/>
        <!-- <ItemList :items="items" @addToWishList="addItemToWishList"/> -->
    </section>
</template>

<script>
import ItemList from '@/components/ItemList.vue'

export default {
    name: 'item-app',
    components:{
        ItemList,
    },
    data(){
        return {
            topWishCountItems: [],
            lowestCostItems: [],
            newItems: [],
            filterBy: null
        }
    },
    async created(){
        this.filterBy = 'wishcount'
        this.topWishCountItems = await this.$store.dispatch({type: 'loadItems', filterBy: this.filterBy});
        this.filterBy = 'price'
        this.lowestCostItems = await this.$store.dispatch({type: 'loadItems', filterBy: this.filterBy});
        this.filterBy = 'createdAt'
        this.newItems = await this.$store.dispatch({type: 'loadItems', filterBy: this.filterBy});
        this.filterBy = null
    },
    methods: {
        addItemToWishList(itemId) { // TODO: CONTINUE THE FLOW- HOPE WIE CAN ADD ITEMS TO WISHlIST AT THE END
            console.log('ITEMAPP item is: ', itemId)
            this.$store.dispatch({type: 'addToWishList', itemId})
        }
    },
    computed:{
        items(){
            return this.$store.getters.items
            // if (!sortBy) return this.$store.getters.items
            // else this.$emit('getItems', sortBy)
            // return true
        }
    },
}
</script>