<template>
    <section class="sign-in">
        <h2>Welcome!</h2>
        <h3>Create an Account</h3>
        <table>
          <tr>
            <th>Have a account?</th>
            <th>New Member?</th>
          </tr>
          <tbody>
            <tr>
              <td>Email:</td>
              <td>First Name:</td>
            </tr>
            <tr>
              <td>Password:</td>
              <td>Last Name:</td>
            </tr>
            <td></td>
          </tbody>
        </table>
    </section>
</template>



<script>
  export default {
    name: 'sign-in',
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
}




// <div class="sign-in">
//             <ul>
//                 <li></li>
//                 <li></li>
//                 <li></li>
//             </ul>
//         </div>
//             <ul>
//                 <li></li>
//                 <li></li>
//                 <li></li>
//             </ul>
//         <div class="sign-up">

//         </div>