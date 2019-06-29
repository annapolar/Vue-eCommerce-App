<template>
  <div>
    <Spinner v-if="isLoading"/>
    <div class="banner">PAYMENT</div>
    <form @submit.prevent="payOrder">
      <div class="payment-wrap">
        <div class="payment-info">
          <h4>Payment Detail</h4>
          <div class="info-form">
            <div class="form-section">
              <label for="usercard">Card Number</label>
              <input type="text" placeholder="xxxx xxxx xxxx xxxx">
            </div>
            <div class="form-section">
              <label for="username">Name on Card</label>
              <input type="text">
            </div>
            <div class="form-section-group">
              <div class="form-section three-column">
                <label for="username">Expiration Date</label>
                <input type="text" placeholder="MM">
              </div>
              <div class="form-section three-column">
                <input type="text" placeholder="YY">
              </div>
              <div class="form-section three-column">
                <label for="username">CVV</label>
                <input type="text">
              </div>
            </div>
          </div>
        </div>

        <div class="purchase-wrap">
          <h4 class="box-title">Your Order</h4>
          <div class="item-box">
            <div class="item-head space-between">
              <h5>Product</h5>
              <h5>Total</h5>
            </div>
            <div class="order-items space-between" v-for="item in order.products" :key="item.id">
              <small>
                {{ item.product.title }} x
                <span>{{item.qty}}</span>
              </small>
              <small>{{item.final_total | currency}}</small>
            </div>
            <div class="box-total space-between">
              <h4>Total</h4>
              <h2>{{ order.total }}</h2>
            </div>
          </div>
          <div class="customer-info-wrap">
            <h5>Shipping Information</h5>
            <div class="customer-info">
              <span>Email</span>
              <span>{{ order.user.email }}</span>
            </div>
            <div class="customer-info">
              <span>Name</span>
              <span>{{ order.user.name }}</span>
            </div>
            <div class="customer-info">
              <span>Phone</span>
              <span>{{ order.user.tel }}</span>
            </div>
            <div class="customer-info">
              <span>Address</span>
              <span>{{ order.user.address }}</span>
            </div>
            <div class="customer-info">
              <span>Message</span>
              <span>{{ order.user.message }}</span>
            </div>
          </div>
          <Button class="checkout-btn" v-bind="paymentScheme"/>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderId: "",
      order: {
        user: {}
      },
      paymentScheme: {
        content: "confirm payment",
        btnStyle: "primary",
        fullWidth: true
      }
    };
  },
  methods: {
    getOrder() {
      const api = `${process.env.VUE_APP_API}/api/${
        process.env.VUE_APP_USER
      }/order/${this.orderId}`;
      this.isLoading = true;
      this.$http.get(api).then(response => {
        this.order = response.data.order;
        this.isLoading = false;
      });
    },
    payOrder() {
      const api = `${process.env.VUE_APP_API}/api/${
        process.env.VUE_APP_USER
      }/pay/${this.orderId}`;
      this.isLoading = true;
      this.$http.post(api).then(response => {
        if (response.data.success) {
          this.$router.push(`/thanks`);
        }
        this.isLoading = false;
      });
    }
  },
  created() {
    this.orderId = this.$route.params.orderId; // 'orderId' must as sama as route's params
    this.getOrder();
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
  margin-bottom: 70px;
}
.payment-wrap {
  width: 100%;
  max-width: 1140px;
  display: flex;
  align-items: flex-start;
  margin: 0 auto;
  margin-bottom: 100px;
  padding: 0 20px;

  h4 {
    text-transform: uppercase;
  }

  .payment-info {
    width: 50%;
    max-width: 700px;
    margin-right: 44px;

    .info-form {
      margin: 30px 0;
    }
    .info-form {
      width: 100%;
      .form-section-group {
        width: 100%;
        display: flex;
        align-items: flex-end;

        .three-column {
          width: 33.333%;
          margin: 0 10px;

          &:first-child {
            margin-left: 0;
          }
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }

  .purchase-wrap {
    width: 50%;
    max-width: 700px;
    background-color: #f8f8f8;
    padding: 30px;
    margin-top: -30px;

    .box-title {
      text-align: center;
      margin: 10px 0 30px 0;
    }
    .space-between {
      display: flex;
      justify-content: space-between;
    }
    .item-box {
      background-color: #fff;
      padding: 30px;
      margin-bottom: 20px;

      .item-head {
        border-bottom: 1px solid $bluegray-shallow;
        padding-bottom: 18px;
        h5 {
          text-transform: uppercase;
        }
      }
      .order-items {
        padding: 10px;

        small {
          font-size: 13px;
          span {
            font-weight: 700;
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
    .customer-info-wrap {
      margin-top: 20px;
      padding: 0 20px;
      h5 {
        margin-bottom: 20px;
      }
      .customer-info {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
        span {
          @include fontStyle(12px, 400, 12px, normal);
        }
      }
    }
    .checkout-btn {
      margin: 30px 0;
    }
  }
}

@media only screen and (max-width: 1080px) {
  .payment-wrap {
    flex-direction: column;
    padding: 0 30px;

    .payment-info {
      width: 100%;
      margin-right: 0;
      margin-bottom: 40px;
      padding: 0 30px;
    }
    .purchase-wrap {
      width: 100%;
      .box-title {
        text-align: left;
      }
    }
  }
}
</style>
