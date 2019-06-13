<template>
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
            <td class="text-center">
              <button @click="removeCartItem(item.id)">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <h3>Total {{totalPrice | currency}}</h3>
      <h3 v-if="totalFinalPrice !== totalPrice">Final Total {{totalFinalPrice | currency}}</h3>
      <div class="input-group mb-3 input-group-sm">
        <input type="text" class="form-control" placeholder="Your Coupon Code" v-model="couponCode">
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="addCouponCode(couponCode)"
          >Apply</button>
        </div>
      </div>
    </div>
    <div class="cartList" v-else>Your Bucket is Empty</div>
    <router-link to="/test_order">
      <button type="button" class="btn btn-outline-secondary">Go Back to Shop</button>
    </router-link>
    <router-link to="/order_form">
    <button type="button" class="btn btn-primary">Checkout</button>
    </router-link>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      couponCode: ""
    };
  },
  created() {
    this.getCart();
  },
  computed: {
    ...mapState(["isLoading", "showModal", "carts"]),

    totalPrice() {
      return this.carts
        .map(cart => cart.total)
        .reduce((total, current) => total + current, 0);
    },
    totalFinalPrice() {
      return this.carts
        .map(cart => cart.final_total)
        .reduce((total, current) => total + current, 0);
    }
  },
  methods: {
    ...mapMutations(["LOADING", "SHOW_MODAL", "CARTS", "COUPON_CODE"]),
    ...mapActions(["getCart", "removeCartItem", "addCouponCode"])
  }
};
</script>

<style>
</style>
