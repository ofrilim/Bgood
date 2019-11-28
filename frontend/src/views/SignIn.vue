<template>
    <section class="sign-in">
        <h2>Welcome!</h2>
        <h3>Create account</h3>
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