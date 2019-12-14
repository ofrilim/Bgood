<template>
  <section class="home">
    <img class="home-img" src="../assets/imgs/FotoJet.jpg"/>
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

