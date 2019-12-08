<template>
  <section class="home">
    <img class="home-img" src="../assets/homepage-carousel/4.jpg"/>
    <ItemApp @getItems="getSortedItems"></itemApp>
  </section>
</template>

<script>
import ItemApp from "../views/ItemApp";

export default {
  name: 'home',
  components: {
    ItemApp,
  },
  methods: {
    getSortedItems(sortBy){
      console.log('sortBy:', sortBy);
      
    }
  }
}
</script>

