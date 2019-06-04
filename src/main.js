import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

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
