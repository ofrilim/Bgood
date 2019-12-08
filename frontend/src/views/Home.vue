<template>
  <section class="home">
    <img class="home-img" src="../assets/homepage-carousel/close-up-friends-laughing-listening-music_1153-215_1.jpg"/>
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

