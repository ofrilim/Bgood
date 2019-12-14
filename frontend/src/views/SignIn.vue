<template>
  <section class="sign-in" v-if="!loggedinUser">
    <h2 class="sign-in-title center">Welcome to Bgood!</h2>
    <div class="sign-in-forms flex flex-evenly">
      <div class="alert signIn-msg" v-if="msg">{{msg}}</div>
      <form>
        <table>
          <tr>
            <th colspan="2">Have an Account?</th>
          </tr>
          <tbody>
            <tr>
              <td>Email:</td>
              <td>
                <input type="email" class="frame" v-model="loginCred.email" placeholder="Email"/>
              </td>
            </tr>
            <tr>
              <td>Password:</td>
              <td>
                <input type="password" class="frame" v-model="loginCred.password" placeholder="Password"/>
              </td>
            </tr>
            <tr>
              <td></td>
                <td><button class="btn" @click.prevent="signIn">Sign In</button></td>
            </tr>
          </tbody>
        </table>
      </form>

      <form @submit.prevent>
        <table>
          <tr>
            <th colspan="2">New Member?</th>
          </tr>
          <tbody>
            <tr>
              <td>First Name:</td>
              <td>
                <input type="text" class="frame" v-model="registerCred.firstName" placeholder="First Name"/>
              </td>
            </tr>
            <tr>
              <td>Last Name:</td>
              <td>
                <input type="text" class="frame" v-model="registerCred.lastName" placeholder="Last Name"/>
              </td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>
                <input type="email" class="frame" v-model="registerCred.email" placeholder="Email"/>
              </td>
            </tr>
            <tr>
              <td>Password:</td>
              <td>
                <input type="password" class="frame" v-model="registerCred.password" placeholder="Password"/>
              </td>
            </tr>
            <tr>
              <td></td>
              <td><button class="btn" @click="register">Register</button></td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: 'sign-in',
  data() {
    return {
      loginCred: {},
      registerCred: {},
      msg: ''
    }
  },
  methods: {
    async signIn() {
      let cred = this.loginCred;
      if (!cred.email) {
        this.msg = 'Please enter your email';
        return;
      }
      if (!cred.password) {
        this.msg = 'Please enter password';
        return;
      }
      const user = await this.$store.dispatch({ type: 'signIn', userCred: { cred } });
      if (!user) {
        this.msg = 'Invalid user email or password';
        return;
      }
      this.$router.push(`/user/${user._id}`);
    },
    async register() {
      const cred = this.registerCred;
      if (!cred.firstName || !cred.lastName || !cred.email || !cred.password) {
        this.msg = 'Please fill up all registration fields';
        return;
      }
      const user = await this.$store.dispatch({ type: 'signUp', userCred: { cred } });
      this.$router.push(`/user/${user._id}`);
    },
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser;
    }
  }
}
</script>
