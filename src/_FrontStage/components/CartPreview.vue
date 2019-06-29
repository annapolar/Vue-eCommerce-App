<template>
  <div class="cart-preview-wrap">
    <Spinner v-if="isLoading"/>
    <div class="cart-preview-head">
      <div class="preview-title">Your Bucket</div>
      <div class="close-preview" @click="closePreview()">
        <small>close</small>
        <div class="close-icon">
          <span class="line1"></span>
          <span class="line2"></span>
        </div>
      </div>
    </div>

    <div class="cart-preview-body" v-if="carts.length">
      <ul class="cart-preview-list">
        <li class="item-list" v-for="item in carts" :key="item.id">
          <div class="item-thumbnail" :style="{backgroundImage: `url(${item.product.imageUrl})`}"></div>
          <div class="item-info">
            <div class="item-name">{{item.product.title}}</div>
            <div class="item-price">
              <span class="item-qty">
                {{item.qty}}
                <ion-icon name="close"/>
              </span>
              {{item.product.price | currency}}
            </div>
          </div>
          <div class="remove-item" @click="removeCartItem(item.id)">
            <ion-icon name="close-circle"/>
          </div>
        </li>
      </ul>
      <div class="price-section">
        <h6>subtotal</h6>
        <div class="all-item-substotal">{{total | currency}}</div>
      </div>
      <div class="button-section">
        <Button v-bind="viewcartScheme" class="viewcart-btn" @buttonEvent="toCarts"/>
      </div>
    </div>
    <div class="cart-empty" v-else>Your Bucket is Empty</div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      viewcartScheme: {
        content: "view cart",
        fullWidth: true,
        btnStyle: "primary"
      }
    };
  },
  computed: {
    ...mapState(["isLoading", "showModal"]),
    ...mapState("cartsModule", ["carts"]),
    ...mapGetters("cartsModule", ["total", "finalTotal"])
  },
  methods: {
    ...mapActions("cartsModule", [
      "getCart",
      "removeCartItem",
      "applyCouponCode"
    ]),
    closePreview() {
      this.$emit("closePreview");
    },
    toCarts() {
      this.$emit("toCarts");
    }
  }
};
</script>

<style lang="scss" scoped>
.cart-preview-wrap {
  @include size(340px, 100vh);
  background-color: #fff;
  padding-bottom: 30px;

  .cart-preview-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: $dark;
    height: 84px;
    padding: 0 30px 0 20px;
    margin-bottom: 8px;

    .preview-title {
      color: #fff;
      text-transform: uppercase;
      @include fontStyle(16px, 400, 16px);
    }

    .close-preview {
      display: flex;
      align-items: center;
      cursor: pointer;

      small {
        text-transform: uppercase;
        color: #fff;
        @include fontStyle(11px, 400, 11px);
      }
      .close-icon {
        @include size(26px);

        position: relative;
        transition: 0.5s;
        margin: 0 3px;

        .line1,
        .line2 {
          @include size(16px, 2px);
          background-color: #fff;
          position: absolute;
          top: 50%;
          left: 50%;
          transition-duration: 0.5s;
        }
        .line1 {
          transform: translateX(-50%);
        }
        .line2 {
          transform: translateX(-50%);
        }
      }
      &:hover {
        cursor: pointer;
        .line1,
        .line2 {
          width: 20px;
        }
        .line1 {
          transform: translateX(-50%) translateY(-50%) rotate(45deg);
        }
        .line2 {
          transform: translateX(-50%) translateY(-50%) rotate(-45deg);
        }
      }
    }
  }
  .cart-preview-body {
    ul.cart-preview-list {
      width: 100%;

      li.item-list {
        display: flex;
        @include size(300px, auto);
        padding: 18px 0;
        border-bottom: 1px solid $bluegray-shallow;
        margin: 0 auto;
        position: relative;
        padding-right: 20px;

        .item-thumbnail {
          @include size(64px);
          background-size: cover;
          background-position: center;
        }

        .item-info {
          padding: 0 8px;
          @include size(210px, auto);
          .item-name {
            @include fontStyle(12px, 500, 1.3);
          }
          .item-price {
            @include fontStyle(14px, 600, 15px);
            color: var(--primary);

            .item-qty {
              @include fontStyle(14px, 400, 14px);
              color: $gray-light;
              position: relative;
              margin-right: 10px;
              ion-icon {
                margin-bottom: -3px;
              }
            }
          }
        }
        .remove-item {
          position: absolute;
          top: 20px;
          right: 10px;
          font-size: 18px;
          cursor: pointer;
          color: $dark;
        }
      }
    }
    .price-section {
      display: flex;
      justify-content: space-between;
      padding: 36px 20px 50px 20px;
      h6 {
        text-transform: uppercase;
      }
      .all-item-substotal {
        @include fontStyle(22px, 600, 22px);
        color: var(--primary-deep);
      }
    }
    .button-section {
      padding: 0 20px;
      .viewcart-btn {
        margin-bottom: 10px;
      }
    }
  }
  .cart-empty {
    @include fontStyle(16px, 400, 16px, normal);
    text-align: center;
    margin-top: 50px;
    letter-spacing: 1.2px;
  }
}
</style>