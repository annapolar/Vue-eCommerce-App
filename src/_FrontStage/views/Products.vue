<template>
  <div class="products-wrap">
    <Spinner v-if="isLoading" />
    <picture>
      <img src="~@/assets/banner.jpg" alt="banner" />
    </picture>
    <div class="category-wrap">
      <a @click="categoryProduct(item = '')">All</a>
      <a v-for="item in categories" :key="item" @click="categoryProduct(item)">{{item}}</a>
    </div>
    <div class="filter-wrap"></div>
    <div class="cards-wrap">
      <div
        class="card-product"
        v-for="(item, index) in filterProduct"
        :key="item.id"
        :style="{'animation-delay': index/8 +'s'}"
      >
        <div class="image-wrap">
          <Button
            v-bind="viewDetailButton"
            class="view-detail-btn"
            @buttonEvent="getProductInfo(item.id)"
          />
          <div class="mask-img"></div>
          <img class="item-img" :src="`${item.imageUrl}`" :alt="item.title" />
        </div>
        <div class="card-item item-cate">{{ item.category }}</div>
        <div class="card-item item-name">{{ item.title }}</div>
        <div class="card-item item-price">
          <span>
            <del
              class="original-price"
              v-if="item.origin_price!= 0"
            >{{ item.origin_price | currency}}</del>
            <del class="original-price" v-else>{{ item.price | currency}}</del>
          </span>
          <span class="current-price" v-if="item.price">{{ item.price | currency}}</span>
        </div>
        <div class="button-center">
          <Button v-bind="addToCartButton" @buttonEvent="addtoCart({id:item.id, qty:1})" />
        </div>
      </div>
    </div>
    <!-- ============== Dialog ================ -->
    <Dialog v-if="showModal" v-bind="dialogScheme" @closeModal="closeDialog" class="dialog-wrap">
      <div slot="body" class="dialog-body">
        <div class="detail-top">
          <div class="detail-left">
            <img :src="productInfo.imageUrl" :alt="productInfo.title" />
          </div>
          <div class="detail-right">
            <div class="product-cate">
              <small>{{ productInfo.category }}</small>
            </div>
            <h4>{{ productInfo.title }}</h4>
            <div class="price-section">
              <div class="current-price">{{ productInfo.price | currency}}</div>
              <del class="original-price">{{ productInfo.origin_price | currency}}</del>
            </div>
            <div class="product-description">{{ productInfo.description }}</div>
            <div class="qty-n-price">
              <CountQty @buyAmount="buyAmount" class="product-quantity" />
              <Button
                v-bind="addToCartButton2"
                class="add-to-cart-btn2"
                @buttonEvent="addtoCart({id:productInfo.id, qty:tempNum})"
              />
            </div>
          </div>
        </div>
        <div class="detail-mid">
          <h5>Product Description</h5>
          <div class="detail-content">{{ productInfo.content }}</div>
        </div>
      </div>
      <div slot="footer"></div>
    </Dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CountQty from "../components/CountQty.vue";

export default {
  components: { CountQty },
  data() {
    return {
      dialogScheme: {
        maxWidth: 1140
      },
      addToCartButton: {
        content: "add to cart",
        size: "S"
      },
      addToCartButton2: {
        content: "add to cart",
        size: "L",
        btnStyle: "primary"
      },
      viewDetailButton: {
        content: "view details",
        size: "S",
        btnStyle: "secondary-w"
      },
      category: "",
      tempNum: 1
    };
  },
  created() {
    this.getProducts();
    this.getCart();
  },
  computed: {
    ...mapState(["isLoading", "showModal", "loadingItem"]),
    ...mapState("productsModule", ["products", "productInfo"]),
    ...mapState("cartsModule", ["carts"]),

    filterProduct() {
      if (this.category == "") {
        return this.products.filter(product => product.is_enabled);
      } else {
        return this.products.filter(
          product => product.is_enabled && product.category == this.category
        );
      }
    },

    categories() {
      const category = this.products.map(product => product.category);
      const categoryString = new Set(category);
      return [...categoryString];
    }
  },
  methods: {
    ...mapActions("productsModule", [
      "getProducts",
      "getProductInfo",
      "closeDialog",
      "addtoCart"
    ]),
    ...mapActions("cartsModule", ["getCart"]),

    categoryProduct(item) {
      if (item !== "") {
        this.category = item;
      } else {
        this.category = "";
      }
    },
    buyAmount(num) {
      this.tempNum = num;
    }
  }
};
</script>

<style lang="scss" scoped>
.products-wrap {
  picture {
    img {
      width: 100%;
      height: auto;
    }
  }
  .category-wrap {
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: var(--primary);
    display: flex;
    justify-content: center;

    a {
      display: inline-block;
      padding: 18px 30px;
      @include linkStyle(13px, 500);
      color: #fff;
      &:hover {
        background-color: var(--primary-deep);
      }
      &.active {
        background-color: var(--primary-deep);
      }
    }
  }
  .cards-wrap {
    width: 100%;
    max-width: 1140px;
    margin: 0 auto;
    overflow: hidden;
    padding: 40px 0;

    .card-product {
      width: 25%;
      float: left;
      padding: 0 10px;
      margin-bottom: 65px;
      animation: fadeIn 2s both;

      .image-wrap {
        width: 100%;
        height: auto;
        overflow: hidden;
        position: relative;
        @include flexCenter;
        margin-bottom: 4px;

        &:hover {
          .view-detail-btn {
            transition: all 0.5s ease-out;
            transform: scale(1);
            opacity: 1;
          }
          .mask-img {
            background-color: rgba($dark, 0.5);
          }
          .item-img {
            transform: scale(1.5);
            transition: 0.5s;
          }
        }

        .view-detail-btn {
          position: absolute;
          z-index: 3;
          opacity: 0;
          transform: scale(2);
        }
        .mask-img {
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: 2;
          transition: all 0.5s ease-out;
        }
        .item-img {
          width: 100%;
          height: auto;
          background-size: cover;
          background-position: center center;
          transition: all 0.5s ease-out;
        }
      }

      .button-center {
        @include flexCenter;
        margin-top: 5px;
      }

      .card-item {
        text-align: center;
        padding: 8px 0;
      }
      .item-cate {
        @include fontStyle(12px, 600, 14px);
        color: var(--secondary);
        text-align: canter;
      }
      .item-name {
        @include fontStyle(14px, 600, 14px);
        color: $dark;
        text-align: canter;
      }
      .item-price {
        .original-price {
          @include fontStyle(14px, 400, 14px);
          color: $bluegray-deep;
          margin-right: 13px;
        }
        .current-price {
          @include fontStyle(20px, 600, 20px);
          color: var(--primary-deep);
        }
      }
    }
  }
  .dialog-wrap {
    .dialog-header {
      position: relative;
      @include size(100%, 30px);

      ion-icon {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 25px;
        padding: 10px;
        cursor: pointer;
      }
    }
    .dialog-body {
      @include size(100%);
      padding: 0 20px;

      .detail-top {
        @include size(100%);
        display: flex;

        .detail-left {
          @include size(50%, auto);
          margin-right: 20px;
          img {
            @include size(100%, auto);
          }
        }
        .detail-right {
          @include size(50%, auto);
          margin-left: 20px;

          .product-cate {
            margin-bottom: 20px;
            small {
              background-color: var(--secondary);
              color: #fff;
              padding: 4px 10px;
              border-radius: 20px;
              letter-spacing: 1.1px;
            }
          }

          .price-section {
            display: flex;
            align-items: center;
            margin: 20px 0 30px 0;

            .original-price {
              @include fontStyle(16px, 400, 16px);
            }
            .current-price {
              @include fontStyle(32px, 700, 28px);
              color: var(--primary);
              padding-right: 15px;
              letter-spacing: 1.2px;
            }
          }
          .product-description {
            @include fontStyle(14px, 400, 1.5, normal);
            color: $gray-mid;
          }
          .qty-n-price {
            display: flex;
            flex-direction: column;
            margin-top: 30px;

            .product-quantity {
              margin-bottom: 20px;
            }
          }
        }
      }
      .detail-mid {
        padding-top: 60px;
        .detail-content {
          padding-top: 20px;
          margin-top: 20px;
          @include fontStyle(14px, 400, 1.7, normal);
          border-top: 1px solid $bluegray-shallow;
        }
      }
    }
  }
}
@media only screen and (max-width: 1080px) {
  .products-wrap {
    .cards-wrap {
      .card-product {
        width: 33.333%;
      }
    }
    .dialog-wrap {
      .dialog-body {
        .detail-top {
          flex-direction: column;

          .detail-left {
            width: 100%;
            margin-right: 0;
          }
          .detail-right {
            width: 100%;
            margin-top: 20px;
            margin-left: 0;
            .qty-n-price {
              flex-direction: row;

              .product-quantity {
                margin-bottom: 0;
              }
              .add-to-cart-btn2 {
                padding-left: 20px;
              }
            }
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 769px) {
  .products-wrap {
    .category-wrap {
      a {
        padding: 16px 20px;
        @include linkStyle(12px, 500);
      }
    }
    .cards-wrap {
      .card-product {
        width: 50%;
      }
    }
  }
}
@media only screen and (max-width: 580px) {
  .products-wrap {
    .cards-wrap {
      .card-product {
        width: 50%;
      }
    }
    .dialog-wrap {
      .dialog-body {
        .detail-top {
          .detail-right {
            .qty-n-price {
              flex-direction: column;

              .product-quantity {
                margin-bottom: 20px;
              }
              .add-to-cart-btn2 {
                padding-left: 0;
              }
            }
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 350px) {
  .products-wrap {
    .cards-wrap {
      .card-product {
        padding: 0 5px;
      }
    }
  }
}
</style>