<template>
  <div>
    <Spinner v-if="isLoading" />
    <h3 class="page-name">Product List</h3>
    <button class="btn-add" @click="openDialog(true)">
      <ion-icon name="add"></ion-icon>
    </button>
    <div class="table-overflow">
      <table class="table-wrap">
        <thead>
          <tr>
            <th></th>
            <th>Product Name</th>
            <th class="text-center">Category</th>
            <th class="text-right">Original Price</th>
            <th class="text-right">Current Price</th>
            <th class="text-center">Active</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td>
              <div class="item-thumbnail" :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
            </td>
            <td>{{item.title}}</td>
            <td class="text-center" style="min-width:120px;">
              <span class="item-category" :class="categoryTag(item.category)">{{item.category}}</span>
            </td>

            <td class="text-right item-origin-price">{{item.origin_price | currency}}</td>
            <td class="text-right item-current-price">{{item.price | currency}}</td>
            <td>
              <span v-if="item.is_enabled" class="text-center item-status item-active"></span>
              <span v-else class="text-center item-status item-inactive"></span>
            </td>
            <td>
              <div class="text-center">
                <button class="action-btn" @click="openDialog(false, item)">
                  <ion-icon name="create"></ion-icon>
                </button>
                <button class="action-btn" @click="openDeleteDialog(item)">
                  <ion-icon name="trash"></ion-icon>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ============== Add & Edit Product Dialog ================ -->
    <Dialog
      v-if="showUpdateModal"
      v-bind="updateDialogScheme"
      @closeModal="showUpdateModal = false"
      @confirmModal="updateProduct"
    >
      <div slot="body">
        <div class="product-dialog-wrap">
          <h3 class="dialog-title">Product Detail</h3>
          <div class="product-detail-wrap">
            <div class="form-section">
              <div class="form-check">
                <div class="switch-btn">
                  <label class="switch" for="is_enabled">
                    <input
                      type="checkbox"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled"
                    />
                    <span class="slider round"></span>
                  </label>
                  Product Available
                </div>
              </div>
            </div>

            <div class="upload-image">
              <div class="upload-image-left">
                <div class="form-section">
                  <label for="image">Image URL</label>
                  <input type="text" id="image" v-model="tempProduct.imageUrl" />
                </div>
                <div class="upload-section">
                  <label for="customFile" class="input-file-wrap">
                    <Spinner v-if="isLoading" />
                    <ion-icon name="cloud-upload"></ion-icon>or Upload Image
                  </label>
                  <input
                    type="file"
                    class="input-file"
                    id="customFile"
                    ref="files"
                    @change="uploadFile"
                  />
                </div>
              </div>
              <div class="upload-image-right">
                <img :src="tempProduct.imageUrl" />
              </div>
            </div>

            <div class="product-detail-content">
              <div class="form-section">
                <label for="title">Product Title</label>
                <input type="text" id="title" v-model="tempProduct.title" />
              </div>

              <div class="form-section">
                <label for="category">Category</label>
                <select id="category" v-model="tempProduct.category">
                  <option value="null" disabled>-- Please select an category --</option>
                  <option value="Modern Chair">Modern Chair</option>
                  <option value="Living Room">Living Room</option>
                  <option value="Styling Lamp">Styling Lamp</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Bedroom">Bedroom</option>
                </select>
              </div>

              <div class="form-row">
                <div class="form-section col-md-6">
                  <label for="origin_price">Original Price</label>
                  <input type="number" id="origin_price" v-model="tempProduct.origin_price" />
                </div>
                <div class="form-section col-md-6">
                  <label for="price">Price</label>
                  <input type="number" id="price" v-model="tempProduct.price" />
                </div>
              </div>

              <div class="form-section">
                <label for="description">Product Description</label>
                <textarea
                  type="text"
                  id="description"
                  rows="4"
                  cols="50"
                  v-model="tempProduct.description"
                ></textarea>
              </div>
              <div class="form-section">
                <label for="content">Content</label>
                <textarea type="text" id="content" rows="4" cols="50" v-model="tempProduct.content"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>

    <!-- ============== Delete Dialog ================ -->
    <Dialog
      v-if="showDeleteModal"
      v-bind="deleteDialogScheme"
      @closeModal="showDeleteModal = false"
      @confirmModal="deleteProduct"
    >
      <div slot="body">
        <div class="dialog-body">
          Are you sure you want to delete
          <mark>{{deleteItemName}}</mark> ?
        </div>
      </div>
    </Dialog>

    <!-- ============== Pagination ================ -->
    <Pagination
      v-bind="pagination"
      @getPage="getProducts"
      @getPrev="getProducts(pagination.current_page - 1)"
      @getNext="getProducts(pagination.current_page + 1)"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      pagination: {},
      deleteItem: "",
      deleteItemName: "",
      tempProduct: {},
      isNew: false,
      isLoading: false,
      showUpdateModal: false,
      showDeleteModal: false,
      updateDialogScheme: {
        maxWidth: 700
      },
      deleteDialogScheme: {
        maxWidth: 500,
        cancelText: "no, cancel",
        confirmText: "yes, delete"
      }
    };
  },
  methods: {
    categoryTag(category) {
      switch (category) {
        case "Modern Chair":
          return "modern-chair-tag";
        case "Styling Lamp":
          return "styling-lamp-tag";
        case "Living Room":
          return "living-room-tag";
        case "Bedroom":
          return "bedroom-tag";
        case "Kitchen":
          return "kitchen-tag";
      }
    },
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/admin/products?page=${page}`;
      this.isLoading = true;
      this.$http.get(api).then(res => {
        this.isLoading = false;
        this.products = res.data.products;
        this.pagination = res.data.pagination;
      });
    },
    updateProduct() {
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/admin/product`;
      let httpMethod = "post";

      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/admin/product/${this.tempProduct.id}`;
        httpMethod = "put";
      }

      this.$http[httpMethod](api, { data: this.tempProduct }).then(res => {
        if (res.data.success) {
          this.showUpdateModal = false;
          this.getProducts();
        } else {
          this.showUpdateModal = false;
          this.getProducts();
          alert("fail adding product, please try again");
        }
      });
    },
    openDialog(isNew, data) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = Object.assign({}, data);
        this.isNew = false;
      }
      this.showUpdateModal = true;
    },
    openDeleteDialog(data) {
      this.deleteItem = data.id;
      this.deleteItemName = data.title;
      this.showDeleteModal = true;
    },
    deleteProduct() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/admin/product/${this.deleteItem}`;
      this.$http.delete(api, this.deleteItem).then(res => {
        if (res.data.success == true) {
          this.products.splice(this.deleteItem, 1);
          this.$bus.$emit("pushMesssage", res.data.message, "success");
        } else {
          this.$bus.$emit("pushMesssage", res.data.message, "danger");
        }
      });
      this.showDeleteModal = false;
    },
    uploadFile() {
      console.log(this);
      const uploadFile = this.$refs.files.files[0]; // get the file
      const formData = new FormData(); // use formData web api to build an object
      formData.append("file-to-upload", uploadFile); // add the file to formData

      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/admin/upload`;
      this.isLoading = true;
      this.$http
        .post(api, formData, {
          // then submit
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          this.isLoading = false;
          if (res.data.success) {
            // this.tempProduct.imageUrl = res.data.imageUrl            // this isn't work **
            this.$set(this.tempProduct, "imageUrl", res.data.imageUrl); // so using $set to set(write) this prop 'imageUrl' into tempProduct
          } else {
            this.$bus.$emit("pushMesssage", res.data.message, "danger");
          }
        });
    }
  },
  created() {
    this.getProducts();
  }
};
</script>

<style lang="scss" scoped>
button {
  outline: none;
}
.product-dialog-wrap {
  .dialog-title {
    text-align: center;
    font-family: "Nunito Sans", sans-serif;
    margin-bottom: 20px;
  }
  .product-detail-wrap {
    .upload-image {
      background-color: #f1f1f1;
      padding: 20px;
      display: flex;
      margin-bottom: 50px;

      .upload-image-left {
        @include size(100%);
      }
      .upload-image-right {
        @include size(300px, auto);
        margin-top: 28px;
        padding: 0 10px;

        img {
          @include size(100%, auto);
        }
      }
    }
  }
}
.dialog-body {
  text-align: center;
}
</style>
