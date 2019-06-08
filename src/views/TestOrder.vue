<template>
  <div>
    <Spinner v-if="isLoading"/>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id" v-if="item.is_enabled">
        <div class="card border-0 shadow-sm">
          <div
            style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${item.imageUrl})`}"
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!item.price">{{ item.origin_price | currency}}</div>
              <div class="h6" v-if="item.price">Original {{ item.origin_price | currency}}</div>
              <div class="h5" v-if="item.price">Now Sale {{ item.price | currency}}</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm" @click="getProductInfo(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="loadingItem === item.id"></i>
              View Details
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addtoCart(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="loadingItem === item.id"></i>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- ============== Dialog ================ -->
    <Dialog v-if="showModal" v-bind="dialogScheme">
      <div slot="header"><h2>{{ productInfo.title }}</h2></div>
      <div slot="body">
        <img class="img-fluid" :src="productInfo.imageUrl" alt="">
        <div class="h6">Original {{ productInfo.origin_price | currency}}</div>
        <div class="h5">Now Sale {{ productInfo.price | currency}}</div>
        <p>{{ productInfo.content }}</p>
        <p>{{ productInfo.description }}</p>
        <select name="" class="form-control mt-3" v-model="productInfo.num">
          <option :value="num" v-for="num in 10" :key="num">
            Select {{num}} {{productInfo.unit}}
          </option>
        </select>
      </div>
      <div slot="footer">
        <div class="text-muted text-nowrap mr-3">
          Total: <strong>{{ productInfo.num * productInfo.price || productInfo.price * 1 }}</strong> 元
        </div>
        <button type="button" class="btn btn-outline-secondary" @click="showModal=false">Go Back</button>
        <button type="button" class="btn btn-primary" @click="addtoCart(productInfo.id, productInfo.num)">Buy Now</button>
      </div>
    </Dialog>

    <!-- ================ Shopping Cart List ================ -->
    <div class="shoppingList" style="max-width:800px; background-color:#f4fcf8; padding:20px;">
      <h2>Your Bucket Lists</h2>
      <table class="table mt-4">
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Category</th>
            <th>Product Name</th>
            <th>Qty</th>
            <th class="text-right">Price</th>
            <th class="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in carts" :key="item.id">
            <td>
              <div
                style="width:50px; height: 50px; background-size: cover; background-position: center"
                :style="{backgroundImage: `url(${item.product.imageUrl})`}"
              ></div>
            </td>
            <td>{{item.product.category}}</td>
            <td>{{item.product.title}}</td>
            <td>{{item.qty}}</td>
            <td class="text-right">{{item.product.price | currency}}</td>
            <td class="text-center"><i class="fas fa-trash"></i></td>
          </tr>
        </tbody>
      </table>
      <div>Total {{totalPrice | currency}}</div>
      <h2>Final Total {{totalFinalPrice | currency}}</h2>
    </div> 
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      productInfo:{},
      carts:[],
      isLoading: false,
      showModal:false,
      dialogScheme: {
        maxWidth: 800
      },
      loadingItem:''
    };
  },
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/products`;
      this.isLoading = true;
      this.$http.get(api).then(response => {
        this.products = response.data.products;
        this.isLoading = false;
      });
    },
    getProductInfo(id){
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/product/${id}`;
      this.loadingItem = id;
      this.$http.get(api).then(response => {
        this.productInfo = response.data.product
        this.showModal = true  
        this.loadingItem = '';
      });
    },
    addtoCart(id,qty=1){
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/cart`;
      this.loadingItem = id;
      const cart = {
        product_id: id,
        qty
      }
      this.$http.post(api, {data:cart}).then(response => {
        this.loadingItem = '';
        this.getCart();
        this.showModal = false
      });
    },
    getCart(){
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/cart`;
      this.isLoading = true;
      this.$http.get(api).then(response => {
        this.carts = response.data.data.carts
        console.log(this.carts)
        this.isLoading = false;
      });
    }
  },
  computed:{
    totalPrice(){
      return this.carts.map(cart => cart.total).reduce((total, current) => total+ current, 0)
    },
    totalFinalPrice(){
      return this.carts.map(cart => cart.final_total).reduce((total, current) => total+ current, 0)
    }  
  },
  created() {
    this.getProducts();
    this.getCart();
  }
};
</script>