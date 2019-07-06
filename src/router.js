import Vue from "vue";
import Router from "vue-router";

import Layout from "./_FrontStage/components/Layout.vue"
import NewProducts from "./_FrontStage/views/Products.vue"
import NewCarts from "./_FrontStage/views/Carts.vue"
import NewCheckout from "./_FrontStage/views/Checkout.vue"
import NewPayment from "./_FrontStage/views/Payment.vue"
import Thanks from "./_FrontStage/views/Thanks.vue"

import Login from "./_BackStage/views/Login.vue";
import newDashboard from "./_BackStage/components/Dashboard.vue";
import newProductList from "./_BackStage/views/ProductList.vue";
import newOrderList from "./_BackStage/views/OrderList.vue";
import newCouponList from "./_BackStage/views/CouponList.vue";


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
      component: newDashboard,
      children: [
        {
          path: "productlist",
          name: "ProductList",
          component: newProductList,
          meta: { requiresAuth: true }
        },
        {
          path: "orderlist",
          name: "OrderList",
          component: newOrderList,
          meta: { requiresAuth: true }
        },
        {
          path: "couponlist",
          name: "CouponList",
          component: newCouponList,
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
          path: "newproducts",
          name: "NewProducts",
          component: NewProducts
        },
        {
          path: "newcarts",
          name: "NewCarts",
          component: NewCarts
        },
        {
          path: "newcheckout",
          name: "NewCheckout",
          component: NewCheckout
        },
        {
          path: "newpayment/:orderId",
          name: "NewPayment",
          component: NewPayment
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
