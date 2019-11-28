<template>
  <section class="home">
    <img class="home-img" src="https://i.pinimg.com/474x/01/31/e1/0131e19cecff33c71add038879b15947.jpg"/>
    <ItemApp></itemApp>
  </section>
</template>

<script>
import ItemApp from "../views/ItemApp";

export default {
  name: 'home',
  components: {
    ItemApp
  }
}
</script>

