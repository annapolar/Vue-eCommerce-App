<template>
  <transition name="modal" v-bind="$props">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" :style="{'max-width': maxWidth+'px','min-width': minWidth+'px', width: width+'px'}">
          <div class="modal-contentAll">
            <div class="modal-header">
              <slot name="header"></slot>
            </div>
            <div class="modal-body">
              <slot name="body"></slot>
            </div>
            <div class="modal-footer">
              <slot name="footer"></slot>
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
    width: { type: Number, default: undefined }
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
  padding:0 20px;
}

.modal-container {
  width: 100%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  overflow: scroll;
}

.modal-contentAll {
  height: 80vh;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
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
