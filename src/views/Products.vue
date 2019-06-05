<template>
  <div>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="showModal=true"> Add Product</button>
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
    <!-- --------- Dialog --------- -->
    <Dialog v-if="showModal" @close="showModal = false">
       <div slot="header">this is custom header</div>
       <div slot="body">this is custom body</div>
    </Dialog>
  </div>
</template>

<script>
import Dialog from "../components/Dialog";

export default {
  components: { Dialog },
  data() {
    return {
      products: [],
      showModal:false
    };
  },
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_API}/api/${
        process.env.VUE_APP_USER
      }/products`;
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
