<template>
  <form
    class="col-md-6"
    @submit.prevent="createOrder(form)"
    style="margin-top:30px; padding:20px; background-color:#eff9ff;"
  >
    <div class="form-group">
      <label for="useremail">Email</label>
      <input
        type="email"
        class="form-control"
        id="useremail"
        :class="{'is-invalid':errors.has('email')}"
        name="email"
        v-model="form.user.email"
        v-validate="'required|email'"
      >
      <small class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</small>
    </div>

    <div class="form-group">
      <label for="username">Name</label>
      <input
        type="text"
        class="form-control"
        id="username"
        :class="{'is-invalid':errors.has('name')}"
        name="name"
        v-model="form.user.name"
        v-validate="'required'"
      >
      <small class="text-danger" v-if="errors.has('name')">{{ errors.first('name') }}</small>
    </div>

    <div class="form-group">
      <label for="usertel">Phone Number</label>
      <input
        type="tel"
        class="form-control"
        id="usertel"
        :class="{'is-invalid':errors.has('phone')}"
        name="phone"
        v-model="form.user.tel"
        v-validate="'required'"
      >
      <small class="text-danger" v-if="errors.has('phone')">{{ errors.first('phone') }}</small>
    </div>

    <div class="form-group">
      <label for="useraddress">Address</label>
      <input
        type="text"
        class="form-control"
        id="useraddress"
        :class="{'is-invalid':errors.has('address')}"
        name="address"
        v-model="form.user.address"
        v-validate="'required'"
      >
      <small class="text-danger" v-if="errors.has('address')">{{ errors.first('address') }}</small>
    </div>

    <div class="form-group">
      <label for="useraddress">Message</label>
      <textarea
        id="usermessage"
        class="form-control"
        cols="30"
        rows="10"
        name="message"
        v-model="form.message"
      ></textarea>
    </div>
    <div class="text-right">
      <button class="btn btn-primary">Submit Order</button>
    </div>
  </form>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      }
    };
  },
  computed: {
    ...mapState(["isLoading"])
  },
  methods: {
    ...mapMutations(["LOADING", "FORM"]),
    ...mapActions(["createOrder"]),

    addtoCart(id, qty = 1) {
      this.$store.dispatch("addtoCart", { id, qty });
    }
  }
};
</script>

<style>
</style>
