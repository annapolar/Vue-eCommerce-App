<template>
  <div class="home">
    <button @click.prevent="signout">Singout</button>
  </div>
</template>

<script>
export default {
  name: "home",
  created() {
    const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/products`;
    this.$http.get(api).then(response => console.log(response.data));
  },
  methods:{
    signout(){
      const api = `${process.env.VUE_APP_API}/logout`
      this.$http.post(api).then(res => {
        if (res.data.success) {
          this.$router.push("/login");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>