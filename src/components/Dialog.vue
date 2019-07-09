<template>
  <transition name="modal" v-bind="$props">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div
          class="modal-container"
          :style="{'max-width': maxWidth+'px','min-width': minWidth+'px', width: width+'px'}"
        >
          <div class="modal-header">
            <ion-icon name="close" v-if="closeSign" @click="$emit('closeModal')"></ion-icon>
          </div>
          <div class="modal-contentAll">
            <div class="modal-body">
              <slot name="body"></slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
                <button
                  v-if="cancelText"
                  class="cancel-text"
                  @click="$emit('closeModal')"
                >{{cancelText}}</button>
                <button
                  v-if="confirmText"
                  class="confirm-text"
                  @click="$emit('confirmModal')"
                >{{confirmText}}</button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Dialog",
  props: {
    maxWidth: { type: Number, default: 500 },
    minWidth: { type: Number, default: 300 },
    width: { type: Number, default: undefined },
    closeSign: { type: Boolean, default: true },
    cancelText: { type: String, default: "cancel" },
    confirmText: { type: String, default: "confirm" }
  },
  data() {
    return {
      showModal: false
    };
  }
};
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
  padding: 0 20px;
}

.modal-container {
  width: 100%;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  border-radius: 14px;
  overflow: hidden;
}
.modal-header {
  height: 50px;
  background-color: var(--primary);
  position: relative;

  ion-icon {
    font-size: 25px;
    color: #fff;
    position: absolute;
    top: 5px;
    right: 20px;
    padding: 8px;
    cursor: pointer;
  }
}
.modal-contentAll {
  max-height: 80vh;
  padding: 20px 50px;
  overflow: scroll;
}

.modal-body {
  margin: 20px 0;
  font-family: "Nunito Sans", sans-serif;
  @include fontStyle(16px, 400, 1.5, normal);
}

.modal-default-button {
  float: right;
}
.modal-footer {
  margin: 40px 0;
  padding-top: 10px;

  button {
    text-transform: uppercase;
    padding: 15px 35px;
    margin-left: 10px;
    border-radius: 2px;
    font-size: 14px;
    transition: 0.5s;
  }
  .cancel-text {
    background-color: transparent;
    border: 1px solid $dark;
    color: $dark;
    &:hover {
      border: 1px solid var(--primary);
      color: var(--primary);
    }
  }
  .confirm-text {
    background-color: var(--primary-deep);
    border: 1px solid var(--primary);
    color: #fff;
    &:hover {
      background-color: var(--primary);
    }
  }
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
