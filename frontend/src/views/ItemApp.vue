<template>
    <section class="item-app caps" v-if="items">
        <div>
            <h1>New On Site:</h1>
                <sequential-entrance delay="1500"> 
                    <ItemList :items="itemsByCreatedAt" @addToWishList="addToWishList"/>
                </sequential-entrance>
            <router-link class="more" to="/item">See more</router-link>
        </div>
        <div>
            <h1>Most Popular:</h1>
                <sequential-entrance>
                    <ItemList :items="itemsByWishCount" @addToWishList="addToWishList"/>
                </sequential-entrance>
            <router-link class="more" to="/item">See more</router-link>
        </div>
        <div>
            <h1>Lowest Price:</h1>
                <sequential-entrance>
                    <ItemList :items="itemsByPrice" @addToWishList="addToWishList"/>
                </sequential-entrance>
            <router-link class="more" to="/item">See more</router-link>
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
        this.$store.dispatch({ type: 'loadItems', filterBy: {} })
    },
    data(){
        return {
           isHome: false,
        }
    },
    methods: {
        addToWishList(item) {    
            this.$store.dispatch({ type:'setOnWishList', item });
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