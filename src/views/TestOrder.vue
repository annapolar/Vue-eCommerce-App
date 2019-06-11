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
      <div class="cartList" v-if="carts.length">
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
              <td class="text-center"><button @click="removeCartItem(item.id)"><i class="fas fa-trash"></i></button></td>
            </tr>
          </tbody>
        </table>
        <h3>Total {{totalPrice | currency}}</h3>
        <h3 v-if="totalFinalPrice !== totalPrice">Final Total {{totalFinalPrice | currency}}</h3>
        <div class="input-group mb-3 input-group-sm">
          <input type="text" class="form-control" placeholder="Your Coupon Code" v-model="couponCode">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
              Apply
            </button>
          </div>
        </div>
      </div>
      <div class="cartList" v-else>Your Bucket is Empty</div>
    </div> 

    <!-- ===================== order form ====================== -->
    <form class="col-md-6" @submit.prevent="createOrder" style="margin-top:30px; padding:20px; background-color:#eff9ff;">
        <div class="form-group">
          <label for="useremail">Email</label>
          <input type="email" class="form-control" id="useremail" :class="{'is-invalid':errors.has('email')}"
            name="email" v-model="form.user.email" v-validate="'required|email'">
             <small class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</small>
        </div>

        <div class="form-group">
          <label for="username">Name</label>
          <input type="text" class="form-control" id="username" :class="{'is-invalid':errors.has('name')}"
            name="name" v-model="form.user.name" v-validate="'required'">
          <small class="text-danger" v-if="errors.has('name')">{{ errors.first('name') }}</small>
        </div>

        <div class="form-group">
          <label for="usertel">Phone Number</label>
          <input type="tel" class="form-control" id="usertel" :class="{'is-invalid':errors.has('phone')}" 
            name="phone" v-model="form.user.tel" v-validate="'required'">
          <small class="text-danger" v-if="errors.has('phone')">{{ errors.first('phone') }}</small>
        </div>

        <div class="form-group">
          <label for="useraddress">Address</label>
          <input type="text" class="form-control" id="useraddress" :class="{'is-invalid':errors.has('address')}" 
            name="address" v-model="form.user.address" v-validate="'required'">   
          <small class="text-danger" v-if="errors.has('address')">{{ errors.first('address') }}</small>      
        </div>

        <div class="form-group">
          <label for="useraddress">Message</label>
          <textarea id="usermessage" class="form-control" cols="30" rows="10"
            name="message" v-model="form.message"></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-primary">Submit Order</button>
        </div>
      </form>
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
      loadingItem:'',
      couponCode:'',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      }
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
    },
    removeCartItem(id){
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/cart/${id}`;
      this.isLoading = true;
      this.$http.delete(api).then(response => {
        this.getCart();
        this.isLoading = false;
      });
    },
    addCouponCode(){
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/coupon`;
      this.isLoading = true;
      const coupon = {
        code: this.couponCode
      }
      this.$http.post(api, {data:coupon}).then(response => {
        console.log(response.data)
        if(response.data.success == false){
          this.$bus.$emit("pushMesssage", response.data.message, "danger")
        }else{
          //...
        }
        this.getCart();
        this.isLoading = false;
      });
    },
    createOrder(){
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/order`;
      this.isLoading = true;
      const order = this.form
      this.$validator.validate().then(valid => {
        if (valid) {
          this.$http.post(api,{data:order}).then(response => {
          console.log(response.data)
          if(response.data.success){
            this.$router.push(`/test_checkout/${response.data.orderId}`)
          }
          this.carts = []
          this.getCart();
          this.isLoading = false;
          
         });
        }else{
          console.log('not completed')
        }
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