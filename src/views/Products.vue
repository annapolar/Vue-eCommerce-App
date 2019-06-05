<template>
  <div>
    <div class="text-right mt-4">
      <button class="btn btn-primary">+ Add Product</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">Caregory</th>
          <th>Product Name</th>
          <th width="120">Original Price</th>
          <th width="120">Current Price</th>
          <th width="100">Active</th>
          <th width="80">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{item.category}}</td>
          <td>{{item.title}}</td>
          <td class="text-right">${{item.origin_price}}</td>
          <td class="text-right">${{item.price}}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">active</span>
            <span v-else>inactive</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: []
    };
  },
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/products`;
      this.$http.get(api).then(response => {
        this.products = response.data.products;
      });
    }
  },
  created() {
    this.getProducts();
  }
};
</script>

<style>
</style>
