<template>
    <section class="user-details">
        <pre>{{user}}</pre>
    </section>
</template>

<script>
import store from '../store/index.js'

export default {
    name: 'user-details',
    store: store,
    computed:{
        user(){
            return this.$store.getters.user
        }
    },
    created(){
        const userId = this.$route.params.id
        this.$store.dispatch({type: 'loadUser', userId})
        // this.$store.getters('user')
    }
}
</script>