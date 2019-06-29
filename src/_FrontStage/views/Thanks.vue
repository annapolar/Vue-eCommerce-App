<template>
  <div class="thanks-order">
    <ion-icon name="happy"></ion-icon>
    <h1>Thank you for the purchasing!</h1>
    <p>We will ship the merchandise as soon as possible.</p>
    <router-link to="/newproducts">
      <Button v-bind="backBtnScheme"/>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      backBtnScheme: {
        content: "Back to Home",
        btnStyle: "primary"
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.thanks-order {
  background-color: #fbfbfb;
  @include flexCenter;
  flex-direction: column;
  min-height: 500px;
  padding: 0 30px;
  text-align: center;

  ion-icon {
    color: var(--primary);
    font-size: 70px;
    margin-bottom: 40px;
  }
  h1 {
    margin-bottom: 20px;
  }
  p {
    margin-bottom: 40px;
  }
}
@media only screen and (max-width: 769px) {
  .thanks-order {
    min-height: 670px;
    h1 {
      @include fontStyle(28px, 500, 1.2, normal);
    }
  }
}
@media only screen and (max-width: 600px) {
  .thanks-order {
    min-height: 440px;
  }
}
</style>
