import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import VeeValidate from 'vee-validate';
import './bus'
import currencyFilter from "./filters/currency";
import Dialog from "./components/Dialog";
import Spinner from "./components/Spinner"
import Pagination from "./components/Pagination"

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(VeeValidate);
Vue.filter('currency', currencyFilter);
Vue.component('Dialog', Dialog);
Vue.component('Spinner', Spinner);
Vue.component('Pagination', Pagination);

axios.defaults.withCredentials = true;

const VUE = new Vue({
  router,
  store,
  render: h => h(App)
})

Vue.$instance = VUE
VUE.$mount("#app");

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_API}/api/user/check`;
    axios.post(api).then(res => {
      console.log(res.data);
      if (res.data.success) {
        next();
      } else {
        next({
          path: "/login"
        });
      }
    });
  } else {
    next();
  }
});
