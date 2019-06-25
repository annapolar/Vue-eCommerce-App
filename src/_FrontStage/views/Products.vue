<template>
  <div class="products-wrap">
    <picture>
      <img src="~@/assets/banner.jpg" alt="banner">
    </picture>
    <div class="category">
      <ul>
        <li class="active">All</li>
        <li>Living Room</li>
        <li>Bedroom</li>
        <li>Kitchen</li>
        <li>modern chairs</li>
        <li>Styling Lamp</li>
      </ul>
    </div>
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
          <Button v-bind="buttonScheme" @click="addtoCart({id:item.id, qty:1})"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

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
  picture {
    img {
      width: 100%;
      height: auto;
    }
  }
  .category {
    background-color: var(--category-bg);
    display: flex;
    justify-content: center;

    ul {
      display: flex;
      li {
        padding: 24px 44px;
        @include linkStyle(14px, 500);
        color: var(--category-font);

        &:hover {
          background-color: var(--category-active);
        }
        &.active {
          background-color: var(--category-active);
        }
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
      padding: 0 15px;
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
    .category {
      ul {
        li {
          padding: 20px 30px;
          @include linkStyle(14px, 500);
        }
      }
    }
    .cards-wrap {
      .card-product {
        width: 33.333%;
      }
    }
  }
}
@media only screen and (max-width: 769px) {
  .products-wrap {
    .category {
      ul {
        li {
          padding: 18px 20px;
          @include linkStyle(12px, 500);
        }
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
    .category {
      ul {
        flex-wrap: wrap;
        li {
          padding: 18px 14px;
          @include linkStyle(11px, 500);
        }
      }
    }
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