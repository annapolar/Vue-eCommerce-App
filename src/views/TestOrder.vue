<template>
  <div>
    <Spinner v-if="isLoading"/>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div
            style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${item.imageUrl})`}"
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!item.price">{{ item.origin_price | currency}}</div>
              <del class="h6" v-if="item.price">Original {{ item.origin_price | currency}}</del>
              <div class="h5" v-if="item.price">Now Sale {{ item.price | currency}}</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm">
              <i class="fas fa-spinner fa-spin" v-if="isLoading"></i>
              View Details
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto">
              <i class="fas fa-spinner fa-spin" v-if="isLoading"></i>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      isLoading: false
    };
  },
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/products`;
      this.isLoading = true;
      this.$http.get(api).then(response => {
        this.products = response.data.products;
        this.isLoading = false;
      });
    }
  },
  created() {
    this.getProducts();
  }
};
</script>