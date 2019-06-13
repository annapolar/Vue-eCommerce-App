import Vue from "vue";
import Vuex from "vuex";
import { isContext } from "vm";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    showModal:false,
    products: [],
    productInfo:{},
    loadingItem:'',
    carts:[],
    couponCode:'',
    form: {
      user: {
        name: '',
        email: '',
        tel: '',
        address: '',
      },
      message: '',
    },
  },

  mutations: {
    LOADING(state, payload){
      state.isLoading = payload
    },
    SHOW_MODAL(state, payload){
      state.showModal = payload
    },
    LOADITEM(state, id){
      state.loadingItem = id
    },
    PRODUCTS(state, payload){
      state.products = payload
    },
    PRODUCT_INFO(state, payload){
      state.productInfo = payload
    },
    CARTS(state,payload){
      state.carts = payload
    },
    COUPON_CODE(state,payload){
      state.couponCode = payload
    },
    FORM(state,payload){
      state.form = payload
    }
  },

  actions: {
    getProducts(context) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/products`;
      context.commit("LOADING", true)
      axios.get(api).then(response => {
        context.commit("PRODUCTS", response.data.products)
        context.commit("LOADING", false)
      });
    },
    getProductInfo(context,id){
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/product/${id}`;
      context.commit("LOADITEM", id)
      axios.get(api).then(response => {
        context.commit("PRODUCT_INFO", response.data.product)
        context.commit("SHOW_MODAL", true)
        context.commit("LOADITEM", "")
      });
    },
    closeDialog(context){
      context.commit("SHOW_MODAL", false)
    },
    addtoCart(context,{id,qty}){
      console.log(context,id,qty)
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/cart`;
      context.commit("LOADITEM", id)
      const cart = {
        product_id: id,
        qty
      }
      axios.post(api, {data:cart}).then(response => {
        context.commit("LOADITEM", "")
        context.dispatch("getCart")
        context.commit("SHOW_MODAL", false)
      });
    },
    getCart(context){
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/cart`;
      context.commit("LOADING", true)
      axios.get(api).then(response => {
        context.commit("CARTS", response.data.data.carts)
        context.commit("LOADING", false)
      });
    },
    removeCartItem(context,id){
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/cart/${id}`;
      context.commit("LOADING", true)
      axios.delete(api).then(response => {
        context.dispatch("getCart")
        context.commit("LOADING", false)
      });
    },
    addCouponCode(context, couponCode){
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/coupon`;
      context.commit("LOADING", true)
      context.commit("COUPON_CODE", couponCode)
      const coupon = {
        code: couponCode
      }
      axios.post(api, {data:coupon}).then(response => {
        if(response.data.success == false){
          console.log('cant find this coupon code')
          Vue.$instance.$bus.$emit("pushMesssage", response.data.message, "danger")
        }else{
          //...
        }
        context.dispatch("getCart")
        context.commit("LOADING", false)
      });
    },
    createOrder(context, form){
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/order`;
      context.commit("LOADING", true)
      context.commit("FORM", form)
      const order = form
      Vue.$instance.$validator.validate().then(valid => {
        if (valid) {
          axios.post(api,{data:order}).then(response => {
          if(response.data.success){
            Vue.$instance.$router.push(`/test_checkout/${response.data.orderId}`)
          }
          context.commit("CARTS", [])
          context.dispatch("getCart")
          context.commit("LOADING", false)
         });
        }else{
          console.log('not completed')
        }
      });
    }      
  }
});
