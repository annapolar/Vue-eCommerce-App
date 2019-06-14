import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Dashboard from "./components/Dashboard.vue";
import ProductList from "./views/ProductList.vue";
import TestOrder from "./views/TestOrder.vue"
import Payment from "./views/Payment.vue"
import Carts from "./views/Carts.vue"
import Checkout from "./views/Checkout.vue"

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
        }
      ]
    },
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
      children: [
        {
          path: "test_order",
          name: "TestOrder",
          component: TestOrder
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
    }
  ]
});
