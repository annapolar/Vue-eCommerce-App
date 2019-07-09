<template>
  <div class="dashboard-wrap">
    <AlertMessage />
    <div class="side-bar" :class="isMenuOpen ? 'menu-open': ''">
      <div class="brand-logo">
        <img src="~@/assets/logo.svg" alt="logo" />
      </div>
      <ul>
        <li>
          <router-link to="/admin/productlist" class="nav-link">
            <ion-icon name="filing"></ion-icon>Product List
          </router-link>
        </li>
        <li>
          <router-link to="/admin/orderlist" class="nav-link">
            <ion-icon name="today"></ion-icon>Order List
          </router-link>
        </li>
        <li>
          <router-link to="/admin/couponlist" class="nav-link">
            <ion-icon name="pricetags"></ion-icon>Coupon List
          </router-link>
        </li>
      </ul>
    </div>

    <div class="container-wrap" :class="isMenuOpen ? 'full-width': ''">
      <div class="nav-bar">
        <div class="menu-icon" @click="isMenuOpen=!isMenuOpen">
          <img src="~@/assets/menu-icon.svg" alt="menu" />
        </div>
        <div class="user-action" @click.prevent="signout">Logout</div>
      </div>
      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
      isActive: false
    };
  },
  methods: {
    signout() {
      const api = `${process.env.VUE_APP_API}/logout`;
      this.$http.post(api).then(res => {
        if (res.data.success) {
          this.$router.push("/login");
        }
      });
    },
    addActiveStyle() {
      this.isActive = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard-wrap {
  width: 100%;
  .side-bar {
    width: 260px;
    height: 100vh;
    background-color: #fff;
    position: fixed;
    box-shadow: 2px 0 18px rgba(#d4dad1, 0.5);
    z-index: 1000;
    transition: all 0.5s ease-out;
    transform: translateX(0);

    &.menu-open {
      transform: translateX(-260px);
    }
    .brand-logo {
      @include size(180px, auto);
      overflow: hidden;
      margin: 0 auto;
      padding: 32px 0;

      img {
        width: 100%;
        height: auto;
      }
    }
    ul {
      li {
        @include size(100%, 60px);
        color: $bluegray-deep;

        .nav-link {
          @include size(100%);
          color: $bluegray-deep;
          display: flex;
          align-items: center;
          letter-spacing: 0.6px;
          @include fontStyle(14px, 400, 14px, normal);
          padding: 0 16px;
          transition: 0.3s;

          ion-icon {
            margin-right: 16px;
            @include fontStyle(18px, 400, 18px, normal);
          }
          &:hover,
          &.active {
            background-color: var(--primary);
            color: #fff;
          }
          &.router-link-active {
            background-color: var(--primary);
            color: #fff;
          }
        }
      }
    }
  }

  .container-wrap {
    width: 100%;
    min-height: 100vh;
    padding-left: 260px;
    padding-right: 0;
    padding-top: 20px;
    background-color: #f8f9f8;
    transition: all 0.5s ease-out;

    &.full-width {
      padding-left: 0;
    }
    .nav-bar {
      @include size(100%, 36px);
      padding: 0 30px;
      display: flex;
      justify-content: space-between;

      .menu-icon {
        img {
          @include size(25px, 15px);
          cursor: pointer;
        }
      }
      .user-action {
        color: var(--primary);
        cursor: pointer;
        @include flexCenter;
        padding: 10px;
      }
    }
    main {
      padding: 30px;
      overflow: auto;
    }
  }
}
</style>
