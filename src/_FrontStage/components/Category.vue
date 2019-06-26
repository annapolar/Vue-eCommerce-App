<template>
  <div class="cate-wrap">
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
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("productsModule", ["products"])
  }
};
</script>

<style lang="scss" scoped>
.cate-wrap {
  picture {
    img {
      width: 100%;
      height: auto;
    }
  }
  .category {
    background-color: var(--primary);
    display: flex;
    justify-content: center;

    ul {
      display: flex;
      li {
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
  }
}

@media only screen and (max-width: 769px) {
  .cate-wrap {
    .category {
      ul {
        li {
          padding: 16px 20px;
          @include linkStyle(12px, 500);
        }
      }
    }
  }
}
</style>
