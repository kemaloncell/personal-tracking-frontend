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
        <Column field="name" header="Name" sortable></Column>
        <Column header="Image">
          <template #body="slotProps">
            <img :src="'demo/images/product/' + slotProps.data.image" :alt="slotProps.data.image"
                 class="product-image"/>
          </template>
        </Column>
        <Column field="price" header="Price" sortable>
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.price) }}
          </template>
        </Column>
      </DataTable>
    </OverlayPanel>
  </div>
</template>

<script>
export default {
  name: 'Notification',
  data() {
    return {}
  },
  methods: {
    onNotificationPanel(event) {
      this.$refs.op.toggle(event);
    },
  }
}
</script>