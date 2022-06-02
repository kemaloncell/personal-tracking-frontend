<template>
  <div>
    <button class="p-link" aria:haspopup="true" aria-controls="overlay_panel" @click="onNotificationPanel">
      <span class="layout-topbar-item-text">Events</span>
      <span class="layout-topbar-icon pi pi-calendar"></span>
      <span class="layout-topbar-badge">{{ listCount }}</span>
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
      <j-table
          :value="list"
          :total="total"
          :loading="loading"
          :totalRecords="total"
          :isVisibleUpdateButton="true"
          :lazy="true"
          @onPageChange="onPage"
          @onDelete="onDelete"

      >
        <template slot="columns">
          <Column field="NotificationType.name" header="Bildirimler"></Column>
        </template>
      </j-table>
    </OverlayPanel>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'Notification',
  data: () => ({
    displayModal: false
  }),


  props: {
    total: {
      type: Number,
      default: () => 0
    }
  },

  computed: {
    ...mapGetters({
      loading: 'notifications/loading',
      list: 'notifications/list',
    }),

    listCount() {
      return this.list.length;
    }
  },

  methods: {
    ...mapActions({
      getList: 'notifications/getList',
      deleteNotifications: 'notifications/delete',

    }),

    onNotificationPanel(event) {
      this.$refs.op.toggle(event);
    },

    onPage(params) {
      const {
        page: {page, rows: size}
      } = params

      this.$emit('onPageChange', {page, size})
    },

    async onDelete(val) {
      try {
        await this.deleteNotifications(val.id)

        this.$toast.add({
          severity: 'success',
          summary: 'Başarılı',
          detail: 'Bildirim silme başarılı !',
          life: 3000
        })

        this.getList()
      } catch {
        this.$toast.add({
          severity: 'error',
          summary: 'Başarısız',
          detail: 'Bildirim silme başarısız !',
          life: 3000
        })
      }
    },

  },

  created() {
    this.getList();
  }
}
</script>