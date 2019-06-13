import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Dashboard from "./components/Dashboard.vue";
import Products from "./views/Products.vue";
import TestOrder from "./views/TestOrder.vue"
import TestCheckout from "./views/TestCheckout.vue"
import Carts from "./views/Carts.vue"
import OrderForm from "./views/OrderForm.vue"

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
          path: "products",
          name: "products",
          component: Products,
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
          path: "test_checkout/:orderId",
          name: "TestCheckut",
          component: TestCheckout
        },
        {
          path: "carts",
          name: "Carts",
          component: Carts
        },
        {
          path: "order_form",
          name: "OrderForm",
          component: OrderForm
        }
      ]
    }
  ]
});
