<template>
    <section>
        <p>wish list component!</p>
    </section>
</template>



// export default {
//     props: {
//         siteTitle: String
//     },
//     template : `
//         <section class="nav-bar">
//             <h1>{{siteTitle | capitalize | addBamia}}</h1>
//             <nav>
//                 <router-link to="/">Home</router-link> |
//                 <router-link to="/count">Items</router-link>

//                 <p>Items Count: {{itemsCount}}</p>
//                 <p>In Cart: {{cartItemsCount}}</p>
//                 <p>TOTAL PRICE: {{cartTotal}}</p>
//             </nav>
//         </section>
//     `,

//     computed : {
//         itemsCount() {
//             return this.$store.getters.items.length
//         },
//         cartItemsCount() {
//             return this.$store.state.cartItems.length
//         },
//         cartTotal() {
//             return this.$store.getters.cartTotalForDisplay
//         }
//     }
// }