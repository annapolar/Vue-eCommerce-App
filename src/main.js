import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./stores/store";
import axios from "axios";
import VueAxios from "vue-axios";
import VeeValidate from 'vee-validate';
import BootstrapVue from 'bootstrap-vue'
import './bus'
import currencyFilter from "./filters/currency";

// global components
import Dialog from "./components/Dialog";
import Spinner from "./components/Spinner"
import Pagination from "./components/Pagination"
import Button from "./components/Button"
import AlertMessage from "./components/AlertMessage"

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(VeeValidate);
Vue.use(BootstrapVue)
Vue.filter('currency', currencyFilter);
Vue.component('Dialog', Dialog);
Vue.component('Spinner', Spinner);
Vue.component('Pagination', Pagination);
Vue.component('Button', Button);
Vue.component('AlertMessage', AlertMessage);

axios.defaults.withCredentials = true;

Vue.config.ignoredElements = [/^ion-/]

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

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
