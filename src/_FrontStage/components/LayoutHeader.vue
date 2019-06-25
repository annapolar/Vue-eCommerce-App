<template>
  <div class="header-wrap">
    <div class="header-bar"></div>
    <div class="header-container">
      <div class="burger-menu">
        <ion-icon name="menu"></ion-icon>
      </div>
      <ul class="menu-left">
        <li class="active">Home</li>
        <li>Shop</li>
      </ul>
      <div class="brand-logo"></div>
      <ul class="menu-right">
        <li>Blog</li>
        <li>About</li>
      </ul>
      <div class="cart-icon-wrap">
        <div class="cart-icon">
          <ion-icon name="cart"/>
          <span class="badge">4</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.header-wrap {
  width: 100%;
  background-color: #fff;

  .header-bar {
    @include size(100%, 35px);
    background-color: var(--primary-deep);
  }

  .header-container {
    position: relative;
    margin: 0 auto;
    @include flexCenter;
    @include size(100%, 135px);
    max-width: 1140px;
    padding-right: 50px;

    .burger-menu {
      display: none;
    }

    ul {
      display: flex;
      li {
        font-size: 14px;
        font-weight: 500;
        padding: 25px;
        color: $gray-mid;
        cursor: pointer;
        text-transform: uppercase;
        &.active {
          color: var(--primary-deep);
        }
        &:hover {
          color: var(--primary);
        }
      }
    }

    .brand-logo {
      @include size(307px, 23px);
      background: url("../../assets/logo.svg") no-repeat center center;
      background-size: contain;
      margin: 0 85px;
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
      .brand-logo {
        margin: 0 30px;
      }
    }
  }
}
@media only screen and (max-width: 769px) {
  .header-wrap {
    .header-bar {
      @include size(100%, 25px);
    }

    .header-container {
      @include size(100%, 100px);
      ul {
        li {
          font-size: 13px;
        }
      }
      .brand-logo {
        @include size(250px, 18px);
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
@media only screen and (max-width: 580px) {
  .header-wrap {
    .header-container {
      @include size(100%, 70px);

      .burger-menu {
        height: 30px;
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        display: block;
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
