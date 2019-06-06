<template>
  <div class="spin-wrap">
    <i class="fas fa-circle-notch fa-spin"></i>
  </div>
</template>

<style lang="scss" scoped>
.spin-wrap {
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1001;
  background-color: rgba(white, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    font-size: 36px;
    color: #007bff;
  }
}
</style>
