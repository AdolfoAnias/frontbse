<template>
    <div class="wrapper fadeInDown">
      <div id="formContent">
        <!-- Tabs Titles -->
    
        <!-- Icon -->
        <div class="fadeIn first">
          <h3>Register New User</h3>
        </div>
    
        <!-- Login Form -->
        <form>
          <input type="text" id="login" v-model="name" class="fadeIn second" placeholder="name">
          <input type="text" id="login" v-model="email" class="fadeIn second" placeholder="email">
          <input type="text" id="password" v-model="password" class="fadeIn third" placeholder="password">
          <input type="submit" @click.prevent="save" class="fadeIn fourth" value="Register">
        </form>    
    
      </div>
    </div>
    </template>
    
    <script>
        import axios from "axios";
    
        export default{
            name: 'register',
            data() {
              return {
                name: '',
                email: '',
                password: ''
              }
            },
            methods: {
                save() {
                  let array = {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                  }            
    
                  axios.post('http://localhost/apibse/public/api/register', array )
                    .then(response => {
                      console.log(response)
                      this.name = '',
                      this.email = '',
                      this.password = ''
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
    
