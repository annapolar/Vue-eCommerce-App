<template>
  <div class="home"></div>
</template>

<script>
export default {
  name: "home",
  created() {
    const api =
      `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_USER}/products`;
    this.$http.get(api).then(response => console.log(response.data));
  }
};
</script>
