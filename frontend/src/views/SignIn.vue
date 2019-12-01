<template>
    <section class="sign-in">
        <h2 class="sign-in-title center">Welcome to Bgood!</h2>
        <div class="flex flex-evenly">
          <form @submit.prevent>
            <table>
              <tr>
                <th colspan="2">Have a account?</th>
              </tr>
              <tbody>
                <tr>
                  <td>Email:</td>
                  <td><input type="email" class="frame" v-model="member.memberEmail"/></td>
                </tr>
                <tr>
                  <td>Password:</td>
                  <td><input type="text" class="frame" v-model="member.memberPassword"/></td>
                </tr>
                <tr>
                  <td></td>
                  <td><button class="btn" @click="signIn">Sign In</button></td>
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
                  <td><input type="text" class="frame" v-model="newMember.firstName"/></td>
                </tr>  
                <tr>
                  <td>Last Name:</td>
                  <td><input type="text" class="frame" v-model="newMember.lastName"/></td>
                </tr> 
                <tr>
                  <td>Email:</td>
                  <td><input type="email" class="frame" v-model="newMember.email"/></td>
                </tr> 
                <tr>
                  <td>Password:</td>
                  <td><input type="text" class="frame" v-model="newMember.password"/></td>
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
        member: {
          memberEmail: '',
          memberPassword: ''
        },
        newMember: {
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        }
      }
    },
    methods: {
      signIn() {
        if (!this.member.memberEmail) return;
        console.log('signed In!');
        console.log('userEmail is: ', this.member.memberEmail);
        console.log('userPassword is: ', this.member.memberPassword);
        this.$router.push('/user/:id')
      },
      register() {
        console.log('register!');
        console.log('userEmail is: ', this.newMember.firstName);
        console.log('userPassword is: ', this.newMember.lastName);
        console.log('userEmail is: ', this.newMember.email);
        console.log('userPassword is: ', this.newMember.password);
        this.$router.push('/user/:id')
      }
    }
}
</script>



