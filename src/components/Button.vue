<template>
  <div>
    <div :class="buttonStyle" class="button-common">
      <button
        :class="buttonSize"
        :style="fullWidth ? 'width:100%' : ''"
        @click="clickEvent"
      >{{content}}</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: { type: String, default: "button" },
    size: { type: String, default: "M" },
    fullWidth: { type: Boolean, default: false },
    btnStyle: { type: String, default: "secondary" }
  },
  computed: {
    buttonSize() {
      switch (this.size) {
        case "L":
          return "large";
        case "M":
          return "middle";
        case "S":
          return "small";
      }
    },
    buttonStyle() {
      switch (this.btnStyle) {
        case "primary":
          return "button-primary";
        case "secondary":
          return "button-secondary";
        case "secondary-w":
          return "button-secondary-white";
      }
    }
  },
  methods: {
    clickEvent() {
      this.$emit("buttonEvent");
    }
  }
};
</script>

<style lang="scss" scoped>
.button-common {
  button {
    padding: 0 10px;
    transition: 0.5s;
    border: 0;
    letter-spacing: 1.2px;

    &.large {
      height: 52px;
      padding: 0 52px;
      @include fontStyle(14px, 600, 14px);
    }
    &.middle {
      height: 48px;
      padding: 0 30px;
      @include fontStyle(14px, 500, 14px);
    }
    &.small {
      height: 40px;
      padding: 0 25px;
      @include fontStyle(12px, 600, 14px);
    }
  }
}

.button-primary {
  button {
    color: #fff;
    background-color: var(--primary-deep);

    &:hover {
      background-color: var(--primary);
    }
  }
}
.button-secondary {
  button {
    border: 1px solid $dark;
    color: $dark;
    background-color: transparent;

    &:hover {
      border: 1px solid var(--primary-deep);
      color: var(--primary-deep);
    }
  }
}
.button-secondary-white {
  button {
    border: 1px solid #fff;
    color: #fff;
    background-color: transparent;

    &:hover {
      background-color: rgba(#fff, 0.3);
    }
  }
}
</style>
