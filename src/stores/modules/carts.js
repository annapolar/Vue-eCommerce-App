import Vue from "vue";
import axios from "axios";

export default {
  namespaced: true,
  state: {
    carts: [],
    tempCouponCode: ""
  },
  getters:{
    total(state) {
      return state.carts
      .map(cart => cart.total)
      .reduce((total, current) => total + current, 0);
    },
    finalTotal(state) {
      return state.carts
      .map(cart => cart.final_total)
      .reduce((total, current) => total + current, 0); 
    }
  },
  mutations: {
    CARTS(state, payload) {
      state.carts = payload;
    },
    TEMP_COUPON_CODE(state, payload){
      state.tempCouponCode = payload;
    }
  },
  actions: {
    getCart(context) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/cart`;
      context.commit("LOADING", true, { root: true });
      axios.get(api).then(res => {
        context.commit("CARTS", res.data.data.carts);
        context.commit("LOADING", false, { root: true });
      });
    },
    removeCartItem(context, id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/cart/${id}`;
      context.commit("LOADING", true, { root: true });
      axios.delete(api).then(res => {
        context.dispatch("getCart");
        context.commit("LOADING", false, { root: true });
      });
    },
    applyCouponCode(context, tempCouponCode){
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/coupon`;
      const code = {
          code: tempCouponCode
        }
      axios.post(api, { data: code }).then(res => {
        context.dispatch("getCart");
        context.commit("TEMP_COUPON_CODE","")
      })
    }
  }
};
