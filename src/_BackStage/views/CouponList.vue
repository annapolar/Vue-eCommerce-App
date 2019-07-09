<template>
  <div>
    <Spinner v-if="isLoading" />
    <h3 class="page-name">Coupon List</h3>
    <button class="btn-add" @click="openDialog(true)">
      <ion-icon name="add"></ion-icon>
    </button>
    <div class="table-overflow">
      <table class="table-wrap">
        <thead>
          <tr>
            <th>Coupon Title</th>
            <th>Coupon Code</th>
            <th>Discount</th>
            <th>Due Date</th>
            <th class="text-center">Active</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="coupon in coupons" :key="coupon.id">
            <td>{{coupon.title}}</td>
            <td>{{coupon.code}}</td>
            <td>{{coupon.percent}}</td>
            <td>{{coupon.due_date}}</td>
            <td>
              <span v-if="coupon.is_enabled" class="text-center item-status item-active"></span>
              <span v-else class="text-center item-status item-inactive"></span>
            </td>
            <td>
              <div class="text-center">
                <button class="action-btn" @click="openDialog(false, coupon)">
                  <ion-icon name="create"></ion-icon>
                </button>
                <button class="action-btn" @click="openDeleteDialog(coupon)">
                  <ion-icon name="trash"></ion-icon>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ============== Add & Edit Coupon Dialog ================ -->
    <Dialog
      v-if="showUpdateModal"
      v-bind="updateDialogScheme"
      @closeModal="showUpdateModal = false"
      @confirmModal="updateCoupon"
    >
      <div slot="body">
        <div class="coupon-dialog-wrap">
          <h3 class="dialog-title">Coupon Detail</h3>
          <div class="form-section">
            <div class="form-check">
              <div class="switch-btn">
                <label class="switch" for="is_enabled">
                  <input
                    type="checkbox"
                    v-model="tempCoupon.is_enabled"
                    :true-value="1"
                    :false-value="0"
                    id="is_enabled"
                  />
                  <span class="slider round"></span>
                </label>
                Coupon Available
              </div>
            </div>
          </div>
          <div class="form-section">
            <label for="title">Coupon Title</label>
            <input type="text" class="form-control" id="title" v-model="tempCoupon.title" />
          </div>
          <div class="form-section">
            <label for="percent">Percentage (%)</label>
            <input type="text" class="form-control" id="percent" v-model="tempCoupon.percent" />
          </div>
          <div class="form-section">
            <label for="code">Coupon Code</label>
            <input type="text" class="form-control" id="code" v-model="tempCoupon.code" />
          </div>
        </div>
      </div>
    </Dialog>

    <!-- ============== Delete Dialog ================ -->
    <Dialog
      v-if="showDeleteModal"
      v-bind="deleteDialogScheme"
      @closeModal="showDeleteModal = false"
      @confirmModal="deleteCoupon"
    >
      <div slot="body">
        <div class="dialog-body">
          You are going to delete coupon:
          <mark>{{deleteCouponName}}</mark>
        </div>
      </div>
    </Dialog>

    <!-- ============== Pagination ================ -->
    <Pagination
      v-bind="pagination"
      @getPage="getCoupons"
      @getPrev="getCoupons(pagination.current_page - 1)"
      @getNext="getCoupons(pagination.current_page + 1)"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      coupons: [],
      pagination: {},
      isLoading: false,
      showUpdateModal: false,
      showDeleteModal: false,
      tempCoupon: {},
      deleteCouponId: "",
      deleteCouponName: "",
      isNew: false,
      updateDialogScheme: {
        maxWidth: 700
      },
      deleteDialogScheme: {
        maxWidth: 500,
        cancelText: "no, cancel",
        confirmText: "yes, delete"
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
      this.showUpdateModal = true;
    },
    updateCoupon() {
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/admin/coupon`;
      let httpMethod = "post";

      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/admin/coupon/${this.tempCoupon.id}`;
        httpMethod = "put";
      }

      this.$http[httpMethod](api, { data: this.tempCoupon }).then(res => {
        if ((res.data.success = true)) {
          this.showUpdateModal = false;
          this.getCoupons();
        } else {
          this.showUpdateModal = false;
          alert("fail updating coupon, please try again");
        }
      });
    },
    openDeleteDialog(data) {
      this.deleteCouponId = data.id;
      this.deleteCouponName = data.title;
      this.showDeleteModal = true;
    },
    deleteCoupon() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/admin/coupon/${this.deleteCouponId}`;
      this.$http.delete(api, this.deleteCouponId).then(res => {
        if ((res.data.success = true)) {
          this.coupons.splice(this.deleteCouponId, 1);
          this.$bus.$emit("pushMesssage", res.data.message, "success");
        } else {
          this.$bus.$emit("pushMesssage", res.data.message, "danger");
        }
        this.showDeleteModal = false;
      });
    }
  },
  created() {
    this.getCoupons();
  }
};
</script>

<style lang="scss" scoped>
.coupon-dialog-wrap {
  .dialog-title {
    text-align: center;
    font-family: "Nunito Sans", sans-serif;
    margin-bottom: 20px;
  }
}
.dialog-body {
  text-align: center;
}
</style>
