<template>
  <div>
    <Spinner v-if="isLoading"/>
    <div class="banner">Carts</div>
    <div class="cart-wrap" v-if="carts.length">
      <div class="cart-items">
        <h4>CART ITEMS</h4>
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Product</th>
              <th class="text-right">Price</th>
              <th class="text-right">Qty</th>
              <th class="text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in carts" :key="item.id">
              <td>
                <ion-icon name="close-circle" class="remove-item" @click="removeCartItem(item.id)"/>
              </td>
              <td>
                <div
                  class="item-thumbnail"
                  :style="{backgroundImage: `url(${item.product.imageUrl})`}"
                ></div>
              </td>
              <td class="item-name">{{item.product.title}}</td>
              <td class="item-price text-right">{{item.product.price | currency}}</td>
              <td class="item-qty text-right">{{item.qty}}</td>
              <td class="item-subtotal text-right">{{item.final_total | currency}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="cart-total">
        <h4 class="cart-total-title">CART TOTALS</h4>
        <div class="price-box">
          <div class="box-subtotal space-between">
            <h5>Subtotal</h5>
            <h5>{{total | currency}}</h5>
          </div>
          <div class="box-shipping space-between">
            <p>Shipping Fee</p>
            <p>$0</p>
          </div>
          <div class="coupon-code space-between">
            <input type="text" placeholder="Coupon code" v-model="tempCouponCode">
            <button @click="applyCouponCode(tempCouponCode)">Apply</button>
          </div>
          <div class="box-total space-between">
            <h4>Total</h4>
            <h2>{{finalTotal | currency}}</h2>
          </div>
        </div>
        <router-link to="/newpayment">
          <Button v-bind="checkoutBtnScheme" class="checkout-btn"/>
        </router-link>
      </div>
    </div>
    <div class="cart-empty-wrap" v-else>
      <div class="cart-empty">
        <ion-icon name="basket"></ion-icon>
        <h4>Your Bucket is Empty</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      checkoutBtnScheme: {
        content: "Checkout",
        fullWidth: true,
        btnStyle: "primary"
      }
    };
  },
  created() {
    this.getCart();
  },
  computed: {
    ...mapState(["isLoading", "showModal"]),
    ...mapState("cartsModule", ["carts"]),
    ...mapGetters("cartsModule", ["total", "finalTotal"]),

    tempCouponCode: {
      get() {
        return this.$store.state.cartsModule.tempCouponCode;
      },
      set(value) {
        this.$store.commit("cartsModule/TEMP_COUPON_CODE", value);
      }
    }
  },
  methods: {
    ...mapActions("cartsModule", [
      "getCart",
      "removeCartItem",
      "applyCouponCode"
    ])
  }
};
</script>

<style lang="scss" scoped>
.banner {
  @include size(100%, 80px);
  @include flexCenter;
  background-color: $dark;
  color: #fff;
  font-size: 20px;
  margin-bottom: 40px;
}
.cart-wrap {
  width: 100%;
  max-width: 1140px;
  display: flex;
  margin: 0 auto;
  padding-bottom: 100px;
  padding: 0 20px;

  .cart-items {
    width: 60%;
    margin-right: 44px;
    margin-top: 30px;

    table {
      width: 100%;
      margin-top: 30px;

      thead {
        tr {
          border-bottom: 1px solid $bluegray-shallow;
          th {
            padding: 16px 8px;
            @include fontStyle(14px, 600, 14px, normal);
          }
        }
      }
      tbody {
        tr {
          @include size(100%, auto);
          border-bottom: 1px solid $bluegray-shallow;
          margin: 0 auto;

          td {
            padding: 20px 8px;
            vertical-align: middle;
            @include fontStyle(14px, 400, 1.3);

            &.item-subtotal {
              @include fontStyle(16px, 600, 1.3);
            }

            &.text-right {
              text-align: right;
            }

            .remove-item {
              cursor: pointer;
              box-sizing: border-box;
            }

            .item-thumbnail {
              width: 65px;
              height: 65px;
              background-size: cover;
              background-position: center;
            }

            ion-icon {
              font-size: 20px;
            }
          }
        }
      }
    }
  }
  .cart-total {
    width: 40%;
    max-width: 768px;
    background-color: #f8f8f8;
    padding: 30px;
    margin-bottom: 50px;

    .cart-total-title {
      text-align: center;
      margin: 10px 0 30px 0;
    }
    .space-between {
      display: flex;
      justify-content: space-between;
    }
    .price-box {
      background-color: #fff;
      padding: 30px;

      .box-subtotal {
        border-bottom: 1px solid $bluegray-shallow;
        padding-bottom: 18px;
      }
      .box-shipping {
        margin: 6px 0;
        p {
          font-size: 14px;
        }
      }
      .coupon-code {
        margin: 30px 0 10px 0;

        input {
          @include size(100%, 48px);
          @include fontStyle(16px, 500, 16px, normal);
          padding: 0 18px;
          color: var(--primary-deep);
          margin-right: -1px;
        }
        button {
          @include size(100px, 48px);
          border: 0;
          background-color: $gray-mid;
          color: #fff;
          text-transform: uppercase;
          transition: all 0.5s ease;

          &:hover {
            background-color: $gray-light;
          }
        }
      }
      .box-total {
        border-top: 1px solid $bluegray-shallow;
        padding-top: 22px;
        margin-top: 24px;

        h2 {
          color: var(--primary);
        }
      }
    }
    .checkout-btn {
      margin: 30px 0;
    }
  }
}
.cart-empty-wrap {
  @include flexCenter;
  width: 100%;
  min-height: 300px;
  padding: 30px 0;

  .cart-empty {
    color: $gray-light;
    ion-icon {
      width: 100%;
      font-size: 60px;
    }
  }
}

@media only screen and (max-width: 1080px) {
  .cart-wrap {
    flex-direction: column;
    .cart-items {
      width: 100%;
      padding: 0 30px;
      margin-right: 0;
      margin-bottom: 40px;
    }
    .cart-total {
      width: 100%;
      .cart-total-title {
        text-align: left;
      }
    }
  }
}
</style>
