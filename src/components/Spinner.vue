<template>
  <div class="spin-wrap">
    <div class="loader"></div>
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

  .loader {
    border: 3px solid transparent;
    border-top: 3px solid var(--secondary);
    border-bottom: 3px solid var(--secondary);
    border-left: 3px solid var(--secondary);
    border-radius: 50%;
    width: 70px;
    height: 70px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
