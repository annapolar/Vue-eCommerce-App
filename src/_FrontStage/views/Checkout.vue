<template>
  <div>
    <Spinner v-if="isLoading"/>
    <div class="banner">SHIPPING DETAIL</div>
    <form @submit.prevent="checkout(form)">
      <div class="checkout-wrap">
        <div class="shipping-info">
          <h4>Shipping Information</h4>
          <div class="info-form">
            <div class="form-section">
              <label for="useremail">Email</label>
              <span class="star-sight">*</span>
              <input
                type="email"
                placeholder="Email"
                id="useremail"
                :class="{'is-invalid':errors.has('email')}"
                name="email"
                v-model="form.user.email"
                v-validate="'required|email'"
              >
              <small class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</small>
            </div>
            <div class="form-section">
              <label for="username">Full Name</label>
              <span class="star-sight">*</span>
              <input
                type="text"
                placeholder="Full Name"
                id="username"
                :class="{'is-invalid':errors.has('name')}"
                name="name"
                v-model="form.user.name"
                v-validate="'required'"
              >
              <small class="text-danger" v-if="errors.has('phone')">{{ errors.first('phone') }}</small>
            </div>
            <div class="form-section">
              <label for="usertel">Phone Number</label>
              <span class="star-sight">*</span>
              <input
                type="tel"
                placeholder="Phone Number"
                id="usertel"
                :class="{'is-invalid':errors.has('phone')}"
                name="phone"
                v-model="form.user.tel"
                v-validate="'required'"
              >
              <small class="text-danger" v-if="errors.has('phone')">{{ errors.first('phone') }}</small>
            </div>
            <div class="form-section">
              <label for="useraddress">Address</label>
              <span class="star-sight">*</span>
              <input
                type="text"
                placeholder="Address"
                id="useraddress"
                :class="{'is-invalid':errors.has('address')}"
                name="address"
                v-model="form.user.address"
                v-validate="'required'"
              >
              <small class="text-danger" v-if="errors.has('address')">{{ errors.first('address') }}</small>
            </div>
            <div class="form-section">
              <label for="usermessage">Message</label>
              <textarea id="usermessage" cols="30" rows="5" name="message" v-model="form.message"></textarea>
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
            <div class="order-items space-between" v-for="item in carts" :key="item.id">
              <small>
                {{item.product.title}} x
                <span>{{item.qty}}</span>
              </small>
              <small>{{item.final_total | currency}}</small>
            </div>
            <div class="box-total space-between">
              <h4>Total</h4>
              <h2>{{finalTotal | currency}}</h2>
            </div>
          </div>
          <Button class="checkout-btn" v-bind="checkBtnScheme"/>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      },
      checkBtnScheme: {
        content: "place order",
        btnStyle: "primary",
        fullWidth: true
      }
    };
  },
  created() {
    this.getCart();
  },
  computed: {
    ...mapState(["isLoading"]),
    ...mapState("cartsModule", ["carts"]),
    ...mapGetters("cartsModule", ["total", "finalTotal"])
  },
  methods: {
    ...mapActions("cartsModule", ["getCart"]),

    checkout(form) {
      const api = `${process.env.VUE_APP_API}/api/${
        process.env.VUE_APP_USER
      }/order`;
      const order = form;
      this.$validator.validate().then(valid => {
        if (valid) {
          this.$http.post(api, { data: order }).then(res => {
            if (res.data.success) {
              this.$router.push(`/payment/${res.data.orderId}`);
            }
            this.$store.commit("cartsModule/CARTS", []);
            this.$store.dispatch("cartsModule/getCart");
            this.$store.commit("LOADING", false);
          });
        } else {
          console.log("not completed");
        }
      });
    }
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
.checkout-wrap {
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

  .shipping-info {
    width: 50%;
    margin-right: 44px;
    .info-form {
      margin: 30px 0;
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
    .checkout-btn {
      margin: 30px 0;
    }
  }
}

@media only screen and (max-width: 1080px) {
  .checkout-wrap {
    flex-direction: column;
    padding: 0 30px;

    .shipping-info {
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
