import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Dashboard from "./components/Dashboard.vue";
import ProductList from "./views/ProductList.vue";
import OrderList from "./views/OrderList.vue";
import CouponList from "./views/CouponList.vue";
import Products from "./views/Products.vue"
import Payment from "./views/Payment.vue"
import Carts from "./views/Carts.vue"
import Checkout from "./views/Checkout.vue"

import Layout from "./_FrontStage/components/Layout.vue"
import NewProducts from "./_FrontStage/views/Products.vue"

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
      path: "/",
      name: "dashboard",
      component: Dashboard,
      children: [
        {
          path: "products",
          name: "Products",
          component: Products
        },
        {
          path: "payment/:orderId",
          name: "Payment",
          component: Payment
        },
        {
          path: "carts",
          name: "Carts",
          component: Carts
        },
        {
          path: "checkout",
          name: "Checkout",
          component: Checkout
        }
      ]
    },
    {
      path:"/",
      name:"layout",
      component: Layout,
      children:[
        {
          path: "newproducts",
          name: "NewProducts",
          component: NewProducts
        },
      ]
    }
  ]
});
