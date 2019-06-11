<template>
   <div class="my-5 row justify-content-center">
    <form class="col-md-6" @submit.prevent="payOrder">
      <table class="table">
        <thead>
          <th>Product Name</th>
          <th>Qty</th>
          <th>Price</th>
        </thead>
        <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td class="align-middle">{{ item.product.title }}</td>
            <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
            <td class="align-middle text-right">{{ item.final_total }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-right">Total</td>
            <td class="text-right">{{ order.total }}</td>
          </tr>
        </tfoot>
      </table>

      <table class="table">
        <tbody>
          <tr>
            <th width="100">Email</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>Phone</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <th>Payment Status</th>
            <td>
              <span v-if="!order.is_paid">Waiting for payment ...</span>
              <span v-else class="text-success">Paid</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-right" v-if="order.is_paid === false">
        <button class="btn btn-danger">Pay Now</button>
      </div>
    </form>
  </div>
</template>

<script>
export default { 
  data() {
    return {
      orderId: "",
      order:{
          user:{

          }
      }
    };
  },
  methods: {
    getOrder() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/order/${this.orderId}`;
      this.isLoading = true;
      this.$http.get(api).then(response => {
          this.order = response.data.order
        this.isLoading = false;
      });
    },
    payOrder(){
    const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/pay/${this.orderId}`;
      this.isLoading = true;
      this.$http.post(api).then(response => {
        if(response.data.success){
            this.$bus.$emit("pushMesssage", response.data.message, "success")
            this.getOrder();
        }
        this.isLoading = false;
      });
    }
  },
  created() {
    this.orderId = this.$route.params.orderId;   // 'orderId' must as sama as route's params
    this.getOrder();
  }
};
</script>

<style>
</style>
