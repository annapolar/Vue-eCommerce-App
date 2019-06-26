<template>
  <div class="products-wrap">
    <Category/>
    <div class="filter-wrap"></div>
    <div class="cards-wrap">
      <div class="card-product" v-for="item in productActive" :key="item.id">
        <img class="item-img" :src="`${item.imageUrl}`" :alt="item.title">
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
          <Button v-bind="buttonScheme" @buttonEvent="addtoCart({id:item.id, qty:1})"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Category from "../components/Category";

export default {
  data() {
    return {
      dialogScheme: {
        maxWidth: 800
      },
      buttonScheme: {
        content: "add to cart",
        size: "S"
      }
    };
  },
  components: {
    Category
  },
  created() {
    this.getProducts();
    this.getCart();
  },
  computed: {
    ...mapState(["isLoading", "showModal", "loadingItem"]),
    ...mapState("productsModule", ["products", "productInfo"]),
    ...mapState("cartsModule", ["carts"]),

    productActive() {
      return this.products.filter(product => {
        return product.is_enabled;
      });
    }
  },
  methods: {
    ...mapActions("productsModule", [
      "getProducts",
      "getProductInfo",
      "closeDialog",
      "addtoCart"
    ]),
    ...mapActions("cartsModule", ["getCart"])
  }
};
</script>

<style lang="scss" scoped>
.products-wrap {
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

      .item-img {
        width: 100%;
        height: auto;
        background-size: cover;
        background-position: center center;
        margin-bottom: 4px;
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
}
@media only screen and (max-width: 1080px) {
  .products-wrap {
    .cards-wrap {
      .card-product {
        width: 33.333%;
      }
    }
  }
}
@media only screen and (max-width: 769px) {
  .products-wrap {
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