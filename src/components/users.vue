<template>
    <div class="card">
        <h3 class="card-header text-center font-weight-bold text-uppercase py-4">
            USERS
        </h3>

        <div class="card-body">
            <div id="table" class="table-editable">
            <span class="table-add float-right mb-3 mr-2"
                ><a href="#!" class="text-success"
                ><i class="fas fa-plus fa-2x" aria-hidden="true"></i></a
            ></span>

            <button type="button" @click="openModalNewUser" class="btn btn-primary btn-rounded btn-sm my-0">
                Add new user
            </button>

            <table class="table table-bordered table-responsive-md table-striped text-center">
                <thead>
                <tr>
                    <th class="text-center">Name</th>
                    <th class="text-center">Email</th>
                </tr>
                </thead>
                <tbody>            
                <tr v-for="user in users" :key="user.id">
                    <td class="pt-3-half" contenteditable="true">{{ user.name }}</td>
                    <td class="pt-3-half" contenteditable="true">{{ user.email }}</td>
                    <td class="pt-3-half">
                    <span class="table-up"
                        ><a href="#!" class="indigo-text"
                        ><i class="fas fa-long-arrow-alt-up" aria-hidden="true"></i></a
                    ></span>
                    <span class="table-down"
                        ><a href="#!" class="indigo-text"
                        ><i class="fas fa-long-arrow-alt-down" aria-hidden="true"></i></a
                    ></span>
                    </td>
                    <td>
                    <span class="table-edit">
                        <button style="padding-right: 10px;" type="button" @click="openModalViewUser( user.id )" class="btn btn-primary btn-rounded btn-sm my-0">
                        View
                        </button>
                        <button type="button" @click="openModalEditUser( user.id )" class="btn btn-primary btn-rounded btn-sm my-0">
                        Edit
                        </button>

                        <button type="button" @click="openModalDeleteUser( user.id )" class="btn btn-danger btn-rounded btn-sm my-0">
                        Remove
                        </button>
                    </span>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>

        <div class="modal fade" id="modal_view_user" tabindex="-1" aria-labelledby="modal_view_user" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <form>
                            <div class="fadeIn first">
                                <h3>User Details</h3>
                            </div>

                            <input type="text" v-model="name" class="fadeIn second" placeholder="name" value="{{ name }}">
                            <input type="text" v-model="email" class="fadeIn second" placeholder="email" value="{{ email }}">
                        </form>
                    </div>
                    <div class="modal-body">
                        ...
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModalViewUser">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modal_edit_user" tabindex="-1" aria-labelledby="modal_edit_user" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <form>
                            <div class="fadeIn first">
                                <h3>Edit User</h3>
                            </div>

                            <input type="text" v-model="name" class="fadeIn second" placeholder="name" value="{{ name }}">
                            <input type="text" v-model="email" class="fadeIn second" placeholder="email" value="{{ email }}">
                        </form>
                    </div>
                    <div class="modal-body">
                        ...
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModalEditUser">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modal_new_user" tabindex="-1" aria-labelledby="modal_new_user" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <form>
                            <div class="fadeIn first">
                                <h3>Add New User</h3>
                            </div>

                            <input type="text" v-model="name" class="fadeIn second" placeholder="name">
                            <input type="text" v-model="email" class="fadeIn second" placeholder="email" >
                        </form>
                    </div>
                    <div class="modal-body">
                        ...
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModalNewUser">Close</button>
                        <button type="button" class="btn btn-primary" @click="addUser">Add</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modal_delete_user" tabindex="-1" aria-labelledby="modal_delete_user" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">

                        <div class="fadeIn first">
                            <h3>Delete User</h3>
                        </div>
                        
                    </div>
                    <div class="modal-body">
                        <h3>Desea eliminar el usuario seleccionado?</h3>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModalDeleteUser">Close</button>
                        <button type="button" class="btn btn-primary" @click="deleteUserId">Delete</button>
                    </div>
                </div>
            </div>
        </div>

    </div>    

</template>

<script>
    import axios from 'axios'
    import * as bootstrap from 'bootstrap';

    export default {
        name: 'user',
        data() {
            return {
                users : [],
                name: '',
                email: '',
                modal_view: null,
                userId: 0,
                uniqueUsers: []
            }
        },
        mounted() {
            this.modal_view_user = new bootstrap.Modal('#modal_view_user', {})
            this.modal_edit_user = new bootstrap.Modal('#modal_edit_user', {})
            this.modal_delete_user = new bootstrap.Modal('#modal_delete_user', {})
            this.modal_new_user = new bootstrap.Modal('#modal_new_user', {})
        },
        created() {
            this.getUsers()
        },
        methods: {
            closeModalViewUser () {
                this.modal_view_user.hide()
            },    
            closeModalDeleteUser () {
                this.modal_delete_user.hide()
            },    
            closeModalEditUser () {
                this.modal_edit_user.hide()
            },    
            closeModalNewUser () {
                this.modal_new_user.hide()
            },    
            openModalEditUser (id) {       
                this.getUserId(id)                
                this.modal_edit_user.show()
            },            
            openModalViewUser (id) {       
                this.getUserId(id)                
                this.modal_view_user.show()
            },            
            openModalDeleteUser (id) {       
                this.getUserId(id)                
                this.modal_delete_user.show()
            },            
            openModalNewUser () {       
                //this.getProductId(id)                
                this.modal_new_user.show()
            },            
            async getUsers() {
                const response = axios.get('http://localhost/apibse/public/api/user')
                this.users = (await response).data
             //   console.log(this.users)
                this.name = this.users.name
                this.email = this.users.email
            },
            async getUserId(id) {
                const response = axios.get('http://localhost/apibse/public/api/user/' + id)
                const getResponse = (await response).data

                const uniqueUsers = JSON.parse(JSON.stringify( getResponse ))

                this.name = uniqueUsers.name
                this.email = uniqueUsers.email
                this.userId = uniqueUsers.id
            },
            async deleteUserId() {
                axios.delete('http://localhost/apibse/public/api/user/' + this.userId)
                this.closeModalDeleteUser()
            },
            async addUser() {
                let array = {
                    name : this.name,
                    email : this.email,
                }                
                
                axios.post('http://localhost/apibse/public/api/user/', array)
                //console.log(await response).data
                this.closeModalNewProduct()
            }

        },
    }
</script>