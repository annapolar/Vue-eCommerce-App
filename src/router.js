import Vue from "vue";
import Router from "vue-router";

import Layout from "./_FrontStage/components/Layout.vue"
import Products from "./_FrontStage/views/Products.vue"
import Carts from "./_FrontStage/views/Carts.vue"
import Checkout from "./_FrontStage/views/Checkout.vue"
import Payment from "./_FrontStage/views/Payment.vue"
import Thanks from "./_FrontStage/views/Thanks.vue"

import Login from "./_BackStage/views/Login.vue";
import Dashboard from "./_BackStage/components/Dashboard.vue";
import ProductList from "./_BackStage/views/ProductList.vue";
import OrderList from "./_BackStage/views/OrderList.vue";
import CouponList from "./_BackStage/views/CouponList.vue";


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "*",
      redirect: "login"
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/admin",
      name: "dashboard",
      component: Dashboard,
      children: [
        {
          path: "productlist",
          name: "ProductList",
          component: ProductList,
          meta: { requiresAuth: true }
        },
        {
          path: "orderlist",
          name: "OrderList",
          component: OrderList,
          meta: { requiresAuth: true }
        },
        {
          path: "couponlist",
          name: "CouponList",
          component: CouponList,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path:"/",
      name:"layout",
      component: Layout,
      children:[
        {
          path: "Products",
          name: "Products",
          component: Products
        },
        {
          path: "Carts",
          name: "Carts",
          component: Carts
        },
        {
          path: "Checkout",
          name: "Checkout",
          component: Checkout
        },
        {
          path: "Payment/:orderId",
          name: "Payment",
          component: Payment
        },
        {
          path: "thanks",
          name: "Thanks",
          component: Thanks
        }
      ]
    }
  ]
});
