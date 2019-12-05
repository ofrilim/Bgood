<template>
    <section class="sign-in">
              <span v-if="loggedinUser"> | <a @click="logout">Logout</a></span> 

        <h2 class="sign-in-title center">Welcome to Bgood!</h2>
        <div class="flex flex-evenly">
          <form>
            <table>
              <tr>
                <th colspan="2">Have a account?</th>
              </tr>
              <tbody>
                <tr>
                  <td>Email:</td>
                  <td><input type="email" class="frame" v-model="loginCred.email" placeholder="Email"/></td>
                </tr>
                <tr>
                  <td>Password:</td>
                  <td><input type="password" class="frame" v-model="loginCred.password" placeholder="Password"/></td>
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
                  <td><input type="text" class="frame" v-model="registerCred.firstName" placeholder="First Name"/></td>
                </tr>  
                <tr>
                  <td>Last Name:</td>
                  <td><input type="text" class="frame" v-model="registerCred.lastName" placeholder="Last Name"/></td>
                </tr> 
                <tr>
                  <td>Email:</td>
                  <td><input type="email" class="frame" v-model="registerCred.email" placeholder="Email"/></td>
                </tr> 
                <tr>
                  <td>Password:</td>
                  <td><input type="password" class="frame" v-model="registerCred.password" placeholder="Password"/></td>
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
        msg: '',
        userToEdit: {}
      }
    },
    methods: {
      async signIn() {
        const cred = this.loginCred
        if (!cred.email || !cred.password) return this.msg = 'Please enter valid username or password';
        const user = await this.$store.dispatch({type: 'signIn', userCred:{cred}})
        this.$router.push(`/user/${user._id}`)
      },
      async register() {
        const cred = this.registerCred;
        if( !cred.firstName || !cred.lastName 
              || !cred.email || !cred.password ) 
              return this.msg = 'Please fill up all register fields';
        // console.log('register! ', cred);
        const user = await this.$store.dispatch({type: 'signUp', userCred: {cred}})
        this.$router.push(`/user/${user._id}`)
      },
      getAllUsers() {
        this.$store.dispatch({type: 'loadUsers'})
      },
      removeUser(userId) {
        this.$store.dispatch({type: 'removeUser', userId})
      }
    },
    computed: {
      users() {
        return this.$store.getters.users
      },
      loggedinUser() {
        return this.$store.getters.loggedinUser
      }
    },
    created() {
      console.log('this.loggedinUser', this.loggedinUser)
  },
// "_id" : "5de41bbe77a3f6bbaad48780" - user with attr ADMIN = null.
// EMAIL = gyallop0@tripadvisor.com
// PASSWORD = 1234
}
</script>


