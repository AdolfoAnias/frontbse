import { createRouter, createWebHistory } from "vue-router"
import loginVue from "./login.vue";
import registerVue from "./register.vue";
import productsVue from './products.vue'
import usersVue from './users.vue'
import homeVue from './home.vue'

const routes = [
    { path : "/", redirect: '/home' },
    { path : "/login", name: 'login', component : loginVue },
    { path : "/register", name: 'register', component : registerVue },
    { path : "/products", name: 'products', component : productsVue },
    { path : "/users", name: 'users', component : usersVue },
    { path : "/home", name: 'home', component : homeVue },
]

const router = createRouter({
    history : createWebHistory(),
    routes : routes
})
  
export default router;