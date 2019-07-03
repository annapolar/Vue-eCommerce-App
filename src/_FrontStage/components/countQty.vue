<template>
  <div class="count-qty-wrap">
    <button @click="minus">
      <ion-icon name="remove"/>
    </button>
    <input type="text" v-model.number="count" @keyup="emitNum">
    <button @click="plus">
      <ion-icon name="add"/>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 1
    };
  },
  methods: {
    minus() {
      this.count > 1 ? (this.count -= 1) : (this.count = 1);
      this.emitNum();
    },
    plus() {
      this.count += 1;
      this.emitNum();
    },
    emitNum() {
      this.$emit("buyAmount", this.count);
    }
  }
};
</script>

<style lang="scss" scoped>
.count-qty-wrap {
  display: flex;
  @include size(210px, 50px);

  input {
    @include size(100%, 50px);
    border: 1px solid $bluegray-light;
    text-align: center;
    margin: 0 -1px;
    font-size: 18px;
  }
  button {
    @include size(40px, 50px);
    @include flexCenter;
    background-color: #fff;
    border: 1px solid $bluegray-light;
    transition: 0.5s;

    ion-icon {
      color: $gray-light;
      font-size: 18px;
    }
    &:hover {
      background-color: $gray-light;

      ion-icon {
        color: #fff;
      }
    }
  }
}
</style>
