<template>
  <div>
    <Spinner v-if="isLoading"/>
    <router-link to="/carts">
      <div>
        <i class="fas fa-shopping-cart"></i>
        <span>{{carts.length}}</span>
      </div>
    </router-link>
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
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="getProductInfo(item.id)"
            >
              <i class="fas fa-spinner fa-spin" v-if="loadingItem === item.id"></i>
              View Details
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
              @click="addtoCart({id:item.id, qty:1})"
            >
              <i class="fas fa-spinner fa-spin" v-if="loadingItem === item.id"></i>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- ============== Dialog ================ -->
    <Dialog v-if="showModal" v-bind="dialogScheme">
      <div slot="header">
        <h2>{{ productInfo.title }}</h2>
      </div>
      <div slot="body">
        <img class="img-fluid" :src="productInfo.imageUrl" alt>
        <div class="h6">Original {{ productInfo.origin_price | currency}}</div>
        <div class="h5">Now Sale {{ productInfo.price | currency}}</div>
        <p>{{ productInfo.content }}</p>
        <p>{{ productInfo.description }}</p>
        <select name class="form-control mt-3" v-model="productInfo.num">
          <option :value="num" v-for="num in 10" :key="num">Select {{num}} {{productInfo.unit}}</option>
        </select>
      </div>
      <div slot="footer">
        <div class="text-muted text-nowrap mr-3">
          Total:
          <strong>{{ productInfo.num * productInfo.price || productInfo.price * 1 }}</strong>
        </div>
        <button type="button" class="btn btn-outline-secondary" @click="closeDialog">Go Back</button>
        <button
          type="button"
          class="btn btn-primary"
          @click="addtoCart({id:productInfo.id, qty:productInfo.num})"
        >Buy Now</button>
      </div>
    </Dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      dialogScheme: {
        maxWidth: 800
      }
    };
  },
  created() {
    this.getProducts();
    this.getCart();
  },
  computed: {
    ...mapState(["isLoading", "showModal","loadingItem"]),
    ...mapState("productsModule",["products", "productInfo"]),
    ...mapState("cartsModule",["carts"])
  },
  methods: {
    ...mapActions("productsModule", [
      "getProducts",
      "getProductInfo",
      "closeDialog",
      "addtoCart"
    ]),
    ...mapActions("cartsModule",["getCart"])
  }
};
</script>