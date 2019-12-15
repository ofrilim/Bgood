<template>
  <section class="home">
    <pre>      Your   <span class="endless">endless</span> 
                closet    online
                      <img class="arrow" src="../assets/imgs/arrow.png"/></pre>
    <img class="home-img" src="../assets/imgs/fashion.jpg"/>
    <ItemApp/>
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

