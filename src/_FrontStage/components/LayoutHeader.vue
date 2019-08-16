<template>
  <div class="header-wrap">
    <div class="header-container">
      <div class="burger-menu">
        <ion-icon name="menu"></ion-icon>
      </div>
      <router-link to="/">
        <div class="brand-logo">
          <img src="~@/assets/logo.svg" alt="logo" />
        </div>
      </router-link>

      <router-link to="login">
        <div class="login">Login</div>
      </router-link>

      <div class="cart-icon-wrap" @click="isCartOpen=!isCartOpen">
        <div class="cart-icon">
          <ion-icon name="cart" />
          <span class="badge" v-if="carts.length">{{carts.length}}</span>
        </div>
      </div>
    </div>

    <CartPreview
      :class="isCartOpen ? 'cart-open': ''"
      class="cart-preview"
      @closePreview="closePreview"
      @toCarts="toCarts"
    />
    <div class="mask" v-if="isCartOpen"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CartPreview from "./CartPreview";

export default {
  data() {
    return {
      isCartOpen: false
    };
  },
  computed: {
    ...mapState("cartsModule", ["carts"])
  },
  components: { CartPreview },
  methods: {
    cartPreview() {
      this.isCartOpen = true;
    },
    closePreview() {
      this.isCartOpen = false;
    },
    toCarts() {
      this.isCartOpen = false;
      this.$router.push(`/carts`);
    }
  }
};
</script>

<style lang="scss" scoped>
.header-wrap {
  width: 100%;
  background-color: #fff;

  .cart-preview {
    overflow: auto;
    transform: translateX(340px);
    transition: all 0.5s ease-out;
    z-index: 2000;
    position: fixed;
    top: 0;
    right: 0;

    &.cart-open {
      transform: translateX(0);
    }
  }
  .mask {
    width: 100%;
    height: 100%;
    background-color: rgba(#000, 0.7);
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    animation: fadeIn 0.6s ease both;
  }
  .header-container {
    position: relative;
    margin: 0 auto;
    @include flexCenter;
    @include size(100%, 100px);
    max-width: 1140px;
    padding-right: 50px;

    .burger-menu {
      display: none;
    }

    ul {
      display: flex;
      li {
        @include linkStyle(14px, 500);
        padding: 25px;
        color: $gray-mid;
        &.active {
          color: var(--primary-deep);
        }
        &:hover {
          color: var(--primary);
        }
      }
    }

    .brand-logo {
      @include size(317px, 53px);
      margin: 0 auto;
      img {
        width: 100%;
        height: auto;
      }
    }

    .login {
      position: absolute;
      top: 42%;
      right: 80px;
      @include fontStyle(14px, 600, 14px, normal);
    }

    .cart-icon-wrap {
      position: absolute;
      top: 50%;
      right: 20px;
      transform: translateY(-50%);
      @include size(30px);

      .cart-icon {
        position: relative;

        ion-icon {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 30px;
          color: $dark;
        }

        .badge {
          position: absolute;
          top: -10px;
          right: -10px;
          background-color: var(--primary-deep);
          cursor: pointer;
          color: #fff;
          min-width: 20px;
          height: 20px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          @include flexCenter;
        }
      }
    }
  }
}

@media only screen and (max-width: 960px) {
  .header-wrap {
    .header-container {
      ul {
        li {
          padding: 15px;
        }
      }
    }
  }
}
@media only screen and (max-width: 769px) {
  .header-wrap {
    .header-container {
      ul {
        li {
          font-size: 13px;
        }
      }
      .brand-logo {
        @include size(260px, 43.5px);
      }
      .cart-icon-wrap {
        right: 30px;

        .cart-icon {
          ion-icon {
            font-size: 25px;
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 500px) {
  .header-wrap {
    .header-container {
      @include size(100%, 70px);

      .brand-logo {
        @include size(200px, 33.5px);
      }

      .burger-menu {
        height: 30px;
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        display: none;
        font-size: 28px;
        color: $dark;
        cursor: pointer;
      }
      ul {
        display: none;
      }
    }
  }
}
</style>
