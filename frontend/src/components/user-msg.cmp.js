export default {
    template: `
        <section class="user-msg" v-if="msg">
            <p>{{msg}}</p>
        </section>
    `,

    computed: {
        msg() {
            return this.$store.state.msg;
        }   
    },
  }