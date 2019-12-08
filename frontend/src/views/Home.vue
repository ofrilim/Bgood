<template>
  <section class="home">
    <img class="home-img" src="../assets/homepage-carousel/elegant-stylish-sisters-spring-park_1157-23934_1.jpg"/>
    <ItemApp></itemApp>
  </section>
</template>

<script>
import ItemApp from "../views/ItemApp";

export default {
  name: 'home',
  components: {
    ItemApp,
  }
}
</script>

