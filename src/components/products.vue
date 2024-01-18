<template>
    <div class="card">
        <h3 class="card-header text-center font-weight-bold text-uppercase py-4">
            PRODUCTS 
        </h3>

        <div class="card-body">
            <div id="table" class="table-editable">
            <span class="table-add float-right mb-3 mr-2"
                ><a href="#!" class="text-success"
                ><i class="fas fa-plus fa-2x" aria-hidden="true"></i></a
            ></span>
            <button type="button" @click="openModalNewProduct" class="btn btn-primary btn-rounded btn-sm my-0">
                Add new product
            </button>

            <table class="table table-bordered table-responsive-md table-striped text-center">
                <thead>
                <tr>
                    <th class="text-center">Image</th>
                    <th class="text-center">Title</th>
                    <th class="text-center">Description</th>
                    <th class="text-center">Price</th>
                </tr>
                </thead>
                <tbody>            
                <tr v-for="product in products" :key="product.id">
                    <td class="pt-3-half" contenteditable="true">
                        <img v-bind:src="product.image" alt="">
                    </td>
                    <td class="pt-3-half" contenteditable="true">{{ product.title }}</td>
                    <td class="pt-3-half" contenteditable="true">{{ product.description }}</td>
                    <td class="pt-3-half" contenteditable="true">{{ product.price }}</td>
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
                        <button style="padding-right: 10px;" type="button" @click="openModalViewProduct( product.id )" class="btn btn-primary btn-rounded btn-sm my-0">
                        View
                        </button>
                        <button type="button" @click="openModalEditProduct( product.id )" class="btn btn-primary btn-rounded btn-sm my-0">
                        Edit
                        </button>

                        <button type="button" @click="openModalDeleteProduct( product.id )" class="btn btn-danger btn-rounded btn-sm my-0">
                        Remove
                        </button>
                    </span>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>

        <div class="modal fade" id="modal_view_prod" tabindex="-1" aria-labelledby="modal_view_prod" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <form>
                            <div class="fadeIn first">
                                <h3>Product Details</h3>
                            </div>

                            <input type="text" v-model="title" class="fadeIn second" placeholder="title" value="{{ title }}">
                            <input type="text" v-model="description" class="fadeIn second" placeholder="description" value="{{ description }}">
                            <input type="text" v-model="price" class="fadeIn second" placeholder="price" value="{{ price }}">
                        </form>
                    </div>
                    <div class="modal-body">
                        ...
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModalViewProduct">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modal_edit_prod" tabindex="-1" aria-labelledby="modal_edit_prod" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <form>
                            <div class="fadeIn first">
                                <h3>Edit Product</h3>
                            </div>

                            <input type="text" v-model="title" class="fadeIn second" placeholder="title" value="{{ title }}">
                            <input type="text" v-model="description" class="fadeIn second" placeholder="description" value="{{ description }}">
                            <input type="text" v-model="price" class="fadeIn second" placeholder="price" value="{{ price }}">
                        </form>
                    </div>
                    <div class="modal-body">
                        ...
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModalEditProduct">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modal_new_prod" tabindex="-1" aria-labelledby="modal_new_prod" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <form enctype="multipart/form-data">
                            <div class="fadeIn first">
                                <h3>Add New Product</h3>
                            </div>

                            <input type="text" v-model="title" class="fadeIn second" placeholder="title">
                            <input type="text" v-model="description" class="fadeIn second" placeholder="description" >
                            <input type="text" v-model="price" class="fadeIn second" placeholder="price" >
                            <label>Image
                                <input type="file" id="file" ref="file" multiple v-on:change="handleFilesUpload()"/>
                            </label>                            
                        </form>
                    </div>
                    <div class="modal-body">
                        ...
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModalNewProduct">Close</button>
                        <button type="button" class="btn btn-primary" @click="addProduct">Add</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modal_delete_prod" tabindex="-1" aria-labelledby="modal_delete_prod" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">

                        <div class="fadeIn first">
                            <h3>Delete Product</h3>
                        </div>
                        
                    </div>
                    <div class="modal-body">
                        <h3>Desea eliminar el producto seleccionado?</h3>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModalDeleteProduct">Close</button>
                        <button type="button" class="btn btn-primary" @click="deleteProductId">Delete</button>
                    </div>
                </div>
            </div>
        </div>

    </div>    

</template>

<script>
    import axios from 'axios'
    import * as bootstrap from 'bootstrap';
//    import config from '@/serverCfg'

    export default {
        name: 'products',
        data() {
            return {
                products : [],
                image: '',
                title: '',
                description: '',
                price: '',
                modal_view: null,
                productId: 0,
                uniqueProducts: [],
                file: ''
            }
        },
        mounted() {
            this.modal_view_prod = new bootstrap.Modal('#modal_view_prod', {})
            this.modal_edit_prod = new bootstrap.Modal('#modal_edit_prod', {})
            this.modal_delete_prod = new bootstrap.Modal('#modal_delete_prod', {})
            this.modal_new_prod = new bootstrap.Modal('#modal_new_prod', {})
        },
        created() {
           // console.log(config.baseUrl)
            this.getProducts()
        },
        methods: {
            handleFilesUpload(){
                this.file = this.$refs.file.files[0];
                console.log(this.file)
            },            
            closeModalViewProduct () {
                this.modal_view_prod.hide()
            },    
            closeModalDeleteProduct () {
                this.modal_delete_prod.hide()
            },    
            closeModalEditProduct () {
                this.modal_edit_prod.hide()
            },    
            closeModalNewProduct () {
                this.modal_new_prod.hide()
            },    
            openModalEditProduct (id) {       
                this.getProductId(id)                
                this.modal_edit_prod.show()
            },            
            openModalViewProduct (id) {       
                this.getProductId(id)                
                this.modal_view_prod.show()
            },            
            openModalDeleteProduct (id) {       
                this.getProductId(id)                
                this.modal_delete_prod.show()
            },            
            openModalNewProduct () {       
                //this.getProductId(id)                
                this.modal_new_prod.show()
            },            
            async getProducts() {                
                const response = axios.get('http://localhost/apibse/public/api/product')
                this.products = (await response).data
                this.title = this.products.title
                this.description = this.products.description
                this.price = this.products.price
                this.image = 'http://localhost/apibse/public/storage/' + this.products.image
                console.log(this.image)
            },
            async getProductId(id) {
                const response = axios.get('http://localhost/apibse/public/api/product/' + id)
                const getResponse = (await response).data

                const uniqueProducts = JSON.parse(JSON.stringify( getResponse ))

                this.title = uniqueProducts.title
                this.description = uniqueProducts.description
                this.price = uniqueProducts.price
                this.productId = uniqueProducts.id
            },
            async deleteProductId() {
                axios.delete('http://localhost/apibse/public/api/product/' + this.productId)
                this.closeModalDeleteProduct()
            },
            async addProduct() {
                let array = {
                    //image : this.image,
                    title : this.title,
                    description : this.description,
                    price : this.price
                }        
                
                let formData = new FormData();
                formData.append('file', this.file);
                
                axios.post('http://localhost/apibse/public/api/product/', array)
                //console.log(await response).data
                this.closeModalNewProduct()
            }

        },
    }
</script>