<template>
    <section class="item-app">
        <div>
            <h1>New On Site:</h1>
            <ItemList :items="itemsByCreatedAt" @addToWishList="addToWishList"/>
            <router-link class="more" to="/item">More</router-link>
        </div>
        <div>
            <h1>Most Popular:</h1>
            <ItemList :items="itemsByWishCount" @addToWishList="addToWishList"/>
            <router-link class="more" to="/item">More</router-link>
        </div>
        <div>
            <h1>Lowest Price:</h1>
            <ItemList :items="itemsByPrice" @addToWishList="addToWishList"/>
            <router-link to="/item">More</router-link>
        </div>       
            <!-- <h1>All:</h1> -->
            <!-- <ItemList :items="items" @addToWishList="addToWishList"/> -->
    </section>
</template>

<script>
import ItemList from '@/components/ItemList.vue'

export default {
    name: 'item-app',
    components:{
        ItemList,
    },
    props: ['sortBy'],
    created(){
        this.$store.dispatch({type: 'loadItems', filterBy: {}})
    },
    data(){
        return {
           isHome: false,
        }
    },
    methods: {
        addToWishList(itemId) {    
            this.$store.dispatch('addToWishList', itemId);
        }
    },
    computed:{
        items(){
            return this.$store.getters.items;
        },
        itemsByPrice(){
            var itemsToShow = this.$store.getters.lowestPriceItems
            return itemsToShow = itemsToShow.slice(0, 5);
        },
        itemsByWishCount(){
            var itemsToShow = this.$store.getters.mostWishedItems
            return itemsToShow = itemsToShow.slice(0, 5);
        },
        itemsByCreatedAt(){
            var itemsToShow = this.$store.getters.newestItems;
           return itemsToShow = itemsToShow.slice(0, 5);
        }
    },
}
</script>