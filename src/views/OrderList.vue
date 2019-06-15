<template>
  <div>
    <Spinner v-if="isLoading"/>
    <h4>Order List</h4>
    <table class="table mt-4">
      <thead>
        <tr>
            <td>Create Date</td>
            <td>Payment Status</td>
            <td>Pay Date</td>
            <td class="text-right">Total Price</td>
            <td>User</td>
            <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">  
          <td>{{order.create_at}}</td>   
          <td>
            <span v-if="order.is_paid" class="text-success">Paid</span>
            <span v-else class="text-danger">Unpaid</span>
          </td>
          <td>{{order.paid_date}}</td>
          <td class="text-right">{{order.total | currency}}</td>
          <td><a href="#">{{order.user.email}}</a></td>
          <td>
            <span class="d-inline-flex">
              <button class="btn btn-outline-primary btn-sm">Edit</button>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- ============== Pagination ================ -->
    <Pagination 
    v-bind="pagination"
    @getPage="getOrders" 
    @getPrev="getOrders(pagination.current_page - 1)" 
    @getNext="geOrders(pagination.current_page + 1)"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [],
      pagination: {},
      isLoading: false
    };
  },
  methods: {
    getOrders(page = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/admin/orders?page=${page}`;
      this.isLoading = true
      this.$http.get(api).then(res => {
        this.isLoading = false
        this.orders = res.data.orders
        this.pagination = res.data.pagination
      });
    }
  },
  created(){
      this.getOrders();
  }
};
</script>

<style>
</style>
