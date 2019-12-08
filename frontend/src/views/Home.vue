<template>
  <section class="home">
    <img class="home-img" src="../assets/homepage-carousel/elegant-stylish-girls-greenhouse_1.jpg"/>
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

