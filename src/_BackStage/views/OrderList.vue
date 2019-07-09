<template>
  <div>
    <Spinner v-if="isLoading" />
    <h3 class="page-name">Order List</h3>
    <!-- ============== collapse ============== -->
    <div class="collapse-wrap">
      <ul class="collapse-head">
        <li class="col">Create Date</li>
        <li class="col">Customer</li>
        <li class="col text-center">Payment Status</li>
        <li class="col">Paid Date</li>
        <li class="price-col text-right">Total Price</li>
        <li class="action-col"></li>
      </ul>
      <div role="tablist">
        <b-card no-body class="collapse-list" v-for="order in orders" :key="order.id">
          <b-card-header header-tag="header" role="tab">
            <b-button block href="#" v-b-toggle="order.id" variant="info">
              <ul>
                <li class="col">{{getTime(order.create_at)}}</li>
                <li class="col">{{order.user.name}}</li>
                <li class="col text-center">
                  <span class="status status-paid" v-if="order.is_paid"></span>
                  <span class="status status-unpaid" v-else></span>
                </li>
                <li class="col">
                  <span v-if="order.paid_date">{{getTime(order.paid_date)}}</span>
                  <span v-else></span>
                </li>
                <li class="price-col text-right">{{order.total | currency}}</li>
                <li class="action-col">
                  <ion-icon name="add"></ion-icon>
                </li>
              </ul>
            </b-button>
          </b-card-header>
          <b-collapse :id="order.id" accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-card-text>
                <div class="card-body-left">
                  <div class="order-title">Order Products</div>
                  <table>
                    <thead>
                      <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Qty</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="product in order.products" :key="product.id">
                        <td>{{product.product.id}}</td>
                        <td>{{product.product.title}}</td>
                        <td>{{product.product.num}}</td>
                        <td>{{product.final_total}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="card-body-right">
                  <div class="order-title">Customer Information</div>
                  <table>
                    <tbody>
                      <tr>
                        <td class="table-key">Name:</td>
                        <td class="table-value">{{order.user.name}}</td>
                      </tr>
                      <tr>
                        <td class="table-key">Email:</td>
                        <td class="table-value">{{order.user.email}}</td>
                      </tr>
                      <tr>
                        <td class="table-key">Phone:</td>
                        <td class="table-value">{{order.user.tel}}</td>
                      </tr>
                      <tr>
                        <td class="table-key">Address:</td>
                        <td class="table-value">{{order.user.address}}</td>
                      </tr>
                      <tr v-if="order.user.message">
                        <td class="table-key">Message:</td>
                        <td class="table-value">{{order.user.message}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </b-card-text>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>
    </div>
    <!-- ============== Pagination ================ -->
    <Pagination
      v-bind="pagination"
      @getPage="getOrders"
      @getPrev="getOrders(pagination.current_page - 1)"
      @getNext="geOrders(pagination.current_page + 1)"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [],
      pagination: {},
      isLoading: false,
      createDate: ""
    };
  },
  methods: {
    getOrders(page = 1) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/admin/orders?page=${page}`;
      this.isLoading = true;
      this.$http.get(api).then(res => {
        console.log(res.data);
        this.isLoading = false;
        this.orders = res.data.orders;
        this.pagination = res.data.pagination;
      });
    },
    getTime(ts) {
      let date = new Date(ts * 1000),
        YY = date.getFullYear(),
        MM = date.getMonth() + 1,
        DD = date.getDate();
      let text = `${YY} / ${MM} / ${DD}`;
      return text;
    }
  },
  created() {
    this.getOrders();
  }
};
</script>

<style lang="scss" scoped>
.collapse-wrap {
  font-family: "Nunito Sans", sans-serif;
  ul {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    li {
      width: 20%;
      .status {
        @include size(6px);
        display: block;
        background-color: $red;
        border-radius: 50%;
        &.status-paid {
          background-color: var(--primary);
        }
        &.status-unpaid {
          background-color: $red;
        }
      }
    }
    .col {
      width: 25%;
      padding-left: 20px;
    }
    .action-col {
      width: 100px;
      text-align: center;
      ion-icon {
        font-size: 20px;
      }
    }
    .price-col {
      width: 120px;
      padding-right: 20px;
    }
    .text-right {
      text-align: right;
      padding-right: 20px;
    }
    .text-center {
      text-align: center;
      @include flexCenter;
    }
  }

  .collapse-list {
    border: 1px solid $bluegray-shallow;
    border-radius: 6px;
    margin-bottom: 10px;

    .card-header {
      padding: 0;
      border-radius: 6px;

      .btn {
        @include size(100%, auto);
        background-color: #fff;
        border-radius: 6px;
        padding: 0;
        color: $dark;
        &:focus {
          box-shadow: none;
        }
        ul {
          padding-top: 20px;
          padding-bottom: 20px;
          text-align: left;
        }
      }
    }
    .card-body {
      width: 100%;
      padding: 0 30px;

      .card-text {
        width: 100%;
        border-top: 1px solid $bluegray-shallow;
        padding: 40px 0;
        display: flex;

        .card-body-left,
        .card-body-right {
          .order-title {
            @include fontStyle(16px, 700, 16px, normal);
            margin-bottom: 30px;
          }
          table {
            @include fontStyle(14px, 400, 14px, normal);
          }
        }

        .card-body-left {
          width: 50%;
          padding-right: 60px;
          table {
            width: 100%;

            thead {
              tr {
                border-bottom: 1px solid $gray-mid;
                th {
                  padding: 10px 8px;
                }
              }
            }
            tbody {
              tr {
                border-bottom: 1px dashed $bluegray-shallow;
                td {
                  padding: 10px 8px;
                  color: $bluegray-deep;
                  @include fontStyle(14px, 300, 14px, normal);
                }
              }
            }
          }
        }
        .card-body-right {
          width: 50%;
          padding-left: 60px;
          table {
            width: 100%;
            tbody {
              tr {
                td {
                  padding: 5px;
                }
              }
            }

            .table-key {
              width: 120px;
            }
            .table-value {
              color: $bluegray-deep;
              @include fontStyle(14px, 300, 14px, normal);
            }
          }
        }
      }
    }
  }
}
</style>
