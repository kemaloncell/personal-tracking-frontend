<template>
  <div>
    <button class="p-link" aria:haspopup="true" aria-controls="overlay_panel" @click="onNotificationPanel">
      <span class="layout-topbar-item-text">Events</span>
      <span class="layout-topbar-icon pi pi-calendar"></span>
      <span class="layout-topbar-badge">5</span>
    </button>
    <button class="p-link">
      <span class="layout-topbar-item-text">Settings</span>
      <span class="layout-topbar-icon pi pi-cog"></span>
    </button>
    <button class="p-link">
      <span class="layout-topbar-item-text">User</span>
      <span class="layout-topbar-icon pi pi-user"></span>
    </button>

    <OverlayPanel ref="op" appendTo="body" :showCloseIcon="true" id="overlay_panel" style="width: 450px">
      <DataTable :value="products" :selection.sync="selectedProduct" selectionMode="single" :paginator="true" :rows="5"
                 @row-select="onProductSelect">
        <Column field="name" sortable>asdasd</Column>
        <Column field="name" sortable>asdasd</Column>
      </DataTable>
    </OverlayPanel>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'Notification',
  data() {
    return {}
  },

  computed: {
    ...mapGetters({
      loading: 'notifications/loading',
    }),
  },

  methods: {
    ...mapActions({
      getSingle: 'notifications/getSingle',

    }),

    onNotificationPanel(event) {
      this.$refs.op.toggle(event);
    },
  },

  created() {
    this.getSingle();
  }
}
</script>