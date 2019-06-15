<template>
  <div>
    <Spinner v-if="isLoading"/>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openDialog(true)">Add Coupon</button>
    </div>
    <h4>Coupon List</h4>
    <table class="table mt-4">
      <thead>
        <tr>
          <td>Coupon Title</td>
          <td>Coupon Code</td>
          <td>Discount</td>
          <td>Due Date</td>
          <td>Available</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="coupon in coupons" :key="coupon.id">
          <td>{{coupon.title}}</td>
          <td>{{coupon.code}}</td>
          <td>{{coupon.percent}}</td>
          <td>{{coupon.due_date}}</td>
          <td>
            <span v-if="coupon.is_enabled" class="text-success">active</span>
            <span v-else class="text-muted">inactive</span>
          </td>
          <td>
            <span class="d-inline-flex">
              <button class="btn btn-outline-primary btn-sm" @click="openDialog(false, coupon)">Edit</button>
              <button class="btn btn-outline-danger btn-sm" @click="openDeleteDialog(coupon)">Delete</button>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- ============== Add & Edit Coupon Dialog ================ -->
    <Dialog v-if="showModal" v-bind="dialogScheme">
      <div slot="header">
        <h3>Add New Coupon</h3>
      </div>
      <div slot="body">
        <div class="form-group">
          <label for="title">Coupon Title</label>
          <input type="text" class="form-control" id="title" v-model="tempCoupon.title">
        </div>
        <div class="form-group">
          <label for="percent">Dicount Percent (%)</label>
          <input type="text" class="form-control" id="percent" v-model="tempCoupon.percent">
        </div>
        <div class="form-group">
          <label for="due_date">Due Date</label>
          <input type="text" class="form-control" id="due_date" v-model="tempCoupon.due_date">
        </div>
        <div class="form-group">
          <label for="code">Coupon Code</label>
          <input type="text" class="form-control" id="code" v-model="tempCoupon.code">
        </div>
        <div class="form-group">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              v-model="tempCoupon.is_enabled"
              :true-value="1"
              :false-value="0"
              id="is_enabled"
            >
            <label class="form-check-label" for="is_enabled">Available</label>
          </div>
        </div>
      </div>
      <div slot="footer">
        <button type="button" class="btn btn-outline-secondary" @click="showModal=false">Cancel</button>
        <button type="button" class="btn btn-primary" @click="updateCoupon">Confirm</button>
      </div>
    </Dialog>

    <!-- ============== Delete Dialog ================ -->
    <Dialog v-if="showDeleteModal">
      <div slot="body">
        Are you sure you want to delete this coupon ?
      </div>
      <div slot="footer">
        <button @click="showDeleteModal = false">No, cancle</button>
        <button @click="deleteCoupon()">Yes, delete</button>
      </div>
    </Dialog>

    <!-- ============== Pagination ================ -->
    <Pagination 
    v-bind="pagination"
    @getPage="getCoupons" 
    @getPrev="getCoupons(pagination.current_page - 1)" 
    @getNext="getCoupons(pagination.current_page + 1)"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coupons: [],
      pagination: {},
      isLoading: false,
      showModal: false,
      showDeleteModal: false,
      tempCoupon: {},
      deleteCouponId:'',
      isNew: false,
      dialogScheme: {
        maxWidth: 700
      }
    };
  },
  methods: {
    getCoupons(page = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/admin/coupons?page=${page}`;
      this.isLoading = true;
      this.$http.get(api).then(res => {
        this.isLoading = false;
        this.coupons = res.data.coupons;
        this.pagination = res.data.pagination;
      });
    },
    openDialog(isNew, data) {
      if (isNew) {
        this.tempCoupon = {};
        this.isNew = true;
      } else {
        this.tempCoupon = Object.assign({}, data);
        this.isNew = false;
      }
      this.showModal = true;
    },
    updateCoupon(){
        let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/admin/coupon`;
        let httpMethod = 'post'

        if(!this.isNew){
            api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/admin/coupon/${this.tempCoupon.id}`;
            httpMethod = 'put'
        }

       this.$http[httpMethod](api, {data:this.tempCoupon}).then( res => {
           if(res.data.success = true){
               this.showModal = false
               this.getCoupons()
           }else{
               this.showModal = false
               alert('fail updating coupon, please try again')
           }
       })
    },
    openDeleteDialog(data){
        this.deleteCouponId = data.id
        this.showDeleteModal = true
    },
    deleteCoupon(){
        const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/admin/coupon/${this.deleteCouponId}`;
        this.$http.delete(api, this.deleteCouponId).then(res => {
            if(res.data.success = true){
                this.coupons.splice(this.deleteCouponId, 1)              
                this.$bus.$emit("pushMesssage", res.data.message, "success")
            }else{
                this.$bus.$emit("pushMesssage", res.data.message, "danger")
            }
            this.showDeleteModal = false
        })
    }
  },
  created() {
    this.getCoupons();
  }
};
</script>

<style>
</style>
