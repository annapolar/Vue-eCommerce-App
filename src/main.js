import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import './bus'
import currencyFilter from "./filters/currency";
import Spinner from "./components/Spinner"

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.filter('currency', currencyFilter);
Vue.component('Spinner', Spinner);

axios.defaults.withCredentials = true;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

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
