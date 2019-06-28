<template>
  <div>
    <Spinner v-if="isLoading"/>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openDialog(true)">Add Product</button>
    </div>
    <h4>Product List</h4>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">Caregory</th>
          <th>Product Name</th>
          <th width="120">Original Price</th>
          <th width="120">Current Price</th>
          <th width="100">Active</th>
          <th width="80">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{item.category}}</td>
          <td>{{item.title}}</td>
          <td class="text-right">{{item.origin_price | currency}}</td>
          <td class="text-right">{{item.price | currency}}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">active</span>
            <span v-else class="text-muted">inactive</span>
          </td>
          <td>
            <span class="d-inline-flex">
              <button class="btn btn-outline-primary btn-sm" @click="openDialog(false, item)">Edit</button>
              <button class="btn btn-outline-danger btn-sm" @click="openDeleteDialog(item)">Delete</button>
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- ============== Add & Edit Product Dialog ================ -->
    <Dialog v-if="showModal" v-bind="dialogScheme">
      <div slot="header">
        <h3>Add New Product</h3>
      </div>
      <div slot="body">
        <div class="row">
          <div class="col-sm-4">
            <div class="form-group">
              <label for="image">Image URL</label>
              <input type="text" class="form-control" id="image" v-model="tempProduct.imageUrl">
            </div>
            <div class="form-group">
              <label for="customFile">
                or Upload Image
                <i class="fas fa-spinner fa-spin" v-if="isLoading"></i>
              </label>
              <input type="file" id="customFile" class="form-control" ref="files" @change="uploadFile">
            </div>
            <img class="img-fluid" :src="tempProduct.imageUrl" alt="">
          </div>
          <div class="col-sm-8">
            <div class="form-group">
              <label for="title">Product Title</label>
              <input type="text" class="form-control" id="title" v-model="tempProduct.title">
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="category">Category</label>
                <input
                  type="text"
                  class="form-control"
                  id="category"
                  v-model="tempProduct.category"
                >
              </div>
              <div class="form-group col-md-6">
                <label for="price">Unit</label>
                <input type="unit" class="form-control" id="unit" v-model="tempProduct.unit">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="origin_price">Original Price</label>
                <input
                  type="number"
                  class="form-control"
                  id="origin_price"
                  v-model="tempProduct.origin_price"
                >
              </div>
              <div class="form-group col-md-6">
                <label for="price">Price</label>
                <input type="number" class="form-control" id="price" v-model="tempProduct.price">
              </div>
            </div>
            <hr>

            <div class="form-group">
              <label for="description">Product Description</label>
              <textarea
                type="text"
                class="form-control"
                id="description"
                v-model="tempProduct.description"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="content">Content</label>
              <textarea type="text" class="form-control" id="content" v-model="tempProduct.content"></textarea>
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="tempProduct.is_enabled"
                  :true-value="1"
                  :false-value="0"
                  id="is_enabled"
                >
                <label class="form-check-label" for="is_enabled">Available</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <button type="button" class="btn btn-outline-secondary" @click="showModal=false">Cancel</button>
        <button type="button" class="btn btn-primary" @click="updateProduct">Confirm</button>
      </div>
    </Dialog>

    <!-- ============== Delete Dialog ================ -->
    <Dialog v-if="showDeleteModal">
      <div slot="body">
        Are you sure you want to delete xxx ?
      </div>
      <div slot="footer">
        <button @click="showDeleteModal = false">No, cancle</button>
        <button @click="deleteProduct()">Yes, delete</button>
      </div>
    </Dialog>

    <!-- ============== Pagination ================ -->
    <Pagination 
    v-bind="pagination"
    @getPage="getProducts" 
    @getPrev="getProducts(pagination.current_page - 1)" 
    @getNext="getProducts(pagination.current_page + 1)"/>
  </div>
</template>

<script>

export default {
  data() {
    return {
      products: [],
      pagination: {},
      showModal: false,
      showDeleteModal: false,
      deleteItem: "",
      tempProduct: {},
      isNew: false,
      isLoading: false,
      dialogScheme:{
        maxWidth: 700
      }
    };
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/admin/products?page=${page}`;
      this.isLoading = true
      this.$http.get(api).then(response => {
          console.log(response.data)
          this.isLoading = false
          this.products = response.data.products;
          this.pagination = response.data.pagination;
          });
    },
    updateProduct() {
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/admin/product`;
      let httpMethod = 'post'

      if(!this.isNew){
          api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/admin/product/${this.tempProduct.id}`
          httpMethod = 'put'
      }
      
      this.$http[httpMethod](api, { data: this.tempProduct }).then(response => {
        if (response.data.success) {
          this.showModal = false;
          this.getProducts();
        } else {
          this.showModal = false;
          this.getProducts();
          alert('fail adding product, please try again')
        }
      });
    },
    openDialog(isNew, data){
        if(isNew){
            this.tempProduct = {}
            this.isNew = true
        }else{
            this.tempProduct = Object.assign({},data)
            this.isNew = false
        }
        this.showModal = true
    },
    openDeleteDialog(data){
      this.deleteItem = data.id
      this.showDeleteModal = true
    },
    deleteProduct(){
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/admin/product/${this.deleteItem}`;
      this.$http.delete(api, this.deleteItem).then(response => {
          if(response.data.success == true){
              this.products.splice(this.deleteItem,1)
              this.$bus.$emit("pushMesssage", response.data.message, "success")
          }else{
              this.$bus.$emit("pushMesssage", response.data.message, "danger")
          }         
      });
      this.showDeleteModal = false  
    },
    uploadFile(){
        console.log(this)
        const uploadFile = this.$refs.files.files[0]    // get the file
        const formData = new FormData()                 // use formData web api to build an object
        formData.append('file-to-upload', uploadFile)   // add the file to formData

        const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/admin/upload`;
        this.isLoading = true
        this.$http.post(api, formData, {                  // then submit
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }).then(response => {
            this.isLoading = false
            if(response.data.success){
                // this.tempProduct.imageUrl = response.data.imageUrl            // this isn't work **
                this.$set(this.tempProduct,'imageUrl', response.data.imageUrl)   // so using $set to set(write) this prop 'imageUrl' into tempProduct
            }else{
                this.$bus.$emit("pushMesssage", response.data.message, "danger")
            }
        })
    }
  },
  created() {
    this.getProducts();
  }
};
</script>

<style>
</style>