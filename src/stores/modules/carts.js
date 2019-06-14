import Vue from "vue";
import axios from "axios";

export default {
  namespaced: true,
  state: {
    carts:[]
  },
  mutations: {
    CARTS(state,payload){
      state.carts = payload
    },
  },
  actions: {
    getCart(context){
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/cart`;
      context.commit("LOADING", true, { root: true })
      axios.get(api).then(response => {
        context.commit("CARTS", response.data.data.carts)
        context.commit("LOADING", false, { root: true })
      });
    },
    removeCartItem(context,id){
        const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/cart/${id}`;
        context.commit("LOADING", true, { root: true })
        axios.delete(api).then(response => {
          context.dispatch("getCart");
          context.commit("LOADING", false, { root: true })
        });
      },
    addCouponCode(context, couponCode) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/coupon`;
      context.commit("LOADING", true, { root: true });
      const coupon = {
        code: couponCode
      };
      axios.post(api, { data: coupon }).then(response => {
        if (response.data.success == false) {      
          new Vue().$bus.$emit("pushMesssage",response.data.message,"danger");       
        } else {
          new Vue().$bus.$emit('pushMesssage', response.data.message, 'danger');      
        }
        context.dispatch("getCart");
        context.commit("LOADING", false, { root: true });
      });
    }
  }
};
