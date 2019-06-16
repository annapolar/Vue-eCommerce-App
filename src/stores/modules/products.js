import axios from "axios";

export default {
  // "state" is local variables
  // "getter, mutations, actions" is global variables
  namespaced: true, // change "getter, mutations, actions" to be local
  state: {
    products: [],
    productInfo: {}
  },
  mutations: {
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    PRODUCT_INFO(state, payload) {
      state.productInfo = payload;
    }
  },
  actions: {
    getProducts(context) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/products`;
      context.commit("LOADING", true, { root: true });
      axios.get(api).then(res => {
        context.commit("PRODUCTS", res.data.products);
        context.commit("LOADING", false, { root: true });
      });
    },
    getProductInfo(context, id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/product/${id}`;
      context.commit("LOADITEM", id, { root: true });
      axios.get(api).then(res => {
        context.commit("PRODUCT_INFO", res.data.product);
        context.commit("SHOW_MODAL", true, { root: true });
        context.commit("LOADITEM", "", { root: true });
      });
    },
    closeDialog(context) {
      context.commit("SHOW_MODAL", false, { root: true });
    },
    addtoCart(context, { id, qty }) {
      console.log(context,id,qty)
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/cart`;
      context.commit("LOADITEM", id, { root: true });
      const cart = {
        product_id: id,
        qty
      };
      axios.post(api, { data: cart }).then(res => {
        context.commit("LOADITEM", "",{ root: true });
        context.dispatch("cartsModule/getCart", {}, { root: true });
        context.commit("SHOW_MODAL", false, { root: true });
      });
    }
  }
};
