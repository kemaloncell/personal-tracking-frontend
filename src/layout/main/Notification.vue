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
      <j-table
          :value="list"
          :total="total"
          :loading="loading"
          :totalRecords="total"
          :isVisibleUpdateButton="true"
          :lazy="true"
          @onPageChange="onPage"
          @onDelete="onDeleteYes"

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
    data: {
      type: Array,
      default: () => []
    },

    loading: {
      type: Boolean,
      default: () => false
    },

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
  },

  methods: {
    ...mapActions({
      getList: 'notifications/getList',

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

    onDeleteYes(id) {
      this.$emit('onDelete', id)
    },

  },

  created() {
    this.getList();
  }
}
</script>