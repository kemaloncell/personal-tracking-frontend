<template>
  <Dialog
      class="j-modal"
      :style="{ '--width': width }"
      v-bind="$attrs"
      :modal="true"
      :maximizable="true"
  >
    <div class="j-modal-content">
      <slot name="content"/>
    </div>
  </Dialog>
</template>

<script>
export default {
  props: {
    width: String
  }
}
</script>

<style lang="scss">
.j-modal {
  background-color: rgba(255, 255, 255, 0.432) !important;

  .p-dialog {
    width: var(--width);
  }

  &-content {
    padding: 0 30px 50px 30px;
    overflow: scroll;
    margin-top: 25px;
    max-height: 700px;
  }

  &.p-component {
    border-radius: 30px;
    max-height: 700px;
    border: 1px solid #979797 !important;
  }

  .p-dialog-header {
    padding: 0;

    .p-dialog-header-icons {
      display: none;
    }
  }

  .p-dialog-content {
    background-color: #fafafa;
    border-radius: 30px;
    padding: 0;
    overflow: hidden;
  }
}
</style>
