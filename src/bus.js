import Vue from "vue";

Vue.prototype.$bus = new Vue();

// [AlertMessage.vue]
// this.$bus.$emit("pushMesssage", Message, Status)
// Message (api response data message content)
// Status (style class name)