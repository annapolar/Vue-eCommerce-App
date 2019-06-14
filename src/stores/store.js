import Vue from "vue";
import Vuex from "vuex";

import productsModule from "./modules/products"
import cartsModule from "./modules/carts"

Vue.use(Vuex);

export default new Vuex.Store({
 
  modules:{
    productsModule, cartsModule
  },
  state: {
    isLoading: false,
    showModal:false,
    loadingItem: "",
  },
  mutations: {
    LOADING(state, payload){
      state.isLoading = payload
    },
    SHOW_MODAL(state, payload){
      state.showModal = payload
    },
    LOADITEM(state, payload) {
      state.loadingItem = payload
    }
  },
  actions: {
  }
});
