<template>
  <div class="layout-topbar">
    <button class="p-link layout-menu-button" @click="onMenuToggle">
      <span class="pi pi-bars"></span>
    </button>
    <div class="layout-topbar-icons">
      <!--<span class="layout-topbar-search">
        <InputText type="text" placeholder="Search" />
        <span class="layout-topbar-search-icon pi pi-search"></span>
      </span> -->


      <Notification/>

    </div>
  </div>
</template>
<script>
import Notification from './Notification.vue'

export default {
  components: {
    Notification
  },
  methods: {
    onMenuToggle(event) {
      this.$emit('menu-toggle', event);
    },
  }
}
</script>