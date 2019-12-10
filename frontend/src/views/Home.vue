<template>
  <section class="home">
    <!-- <img class="home-img" src="../assets/homepage-carousel/brooke-testoni_1.jpg"/> -->
    <!-- <div class="home-slogen">The Neighbour's Closet Is Always Greener</div> -->
    <ItemApp/>
  </section>
</template>

<script>
import ItemApp from "../views/ItemApp";

export default {
  name: 'home',
  components: {
    ItemApp,
  },
}
</script>

