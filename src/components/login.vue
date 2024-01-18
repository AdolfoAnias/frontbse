<template>
<div class="wrapper fadeInDown">
  <div id="formContent">
    <!-- Tabs Titles -->

    <!-- Icon -->
    <div class="fadeIn first">
      <h3>Login</h3>
    </div>

    <!-- Login Form -->
    <form>
      <input type="text" id="login" v-model="email" class="fadeIn second" placeholder="email">
      <input type="text" id="password" v-model="password" class="fadeIn third" placeholder="password">
      <input type="submit" @click.prevent="save" class="fadeIn fourth" value="Log In">
    </form>

    <!-- Remind Passowrd -->
    <div id="formFooter">
      <a class="underlineHover" href="#">Forgot Password?</a>
    </div>

  </div>
</div>
</template>

<script>
    import axios from "axios";
    //import VueLocalStorage from 'vue-local-storage'

    export default{
        name: 'login',
        data() {
          return {
            email: '',
            password: ''
          }
        },
        computed: {
          isLoggedIn(){ return this.$localStorage.token !== ''; }
        },
        methods: {
            save() {
              let array = {
                email: this.email,
                password: this.password,
              }            

              axios.post('http://localhost/apibse/public/api/login', array )
                .then(response => {
                  //const token = response.data.access_token
                  console.log(response.data.access_token)
                  this.email = '',
                  this.password = ''
                  //localStorage.token = token; 
                  this.$router.push('/');
                })
                .catch(error => {
                  this.errorMessage = error.message;
                  console.error("There was an error!", error);
                });       
                  
              }
        },        
    }
</script>

