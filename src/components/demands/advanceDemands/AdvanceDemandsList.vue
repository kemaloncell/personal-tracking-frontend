<template>

  <j-table
      :value="data"
      :total="total"
      :loading="loading"
      :totalRecords="total"
      :lazy="true"
      sortMode="multiple"
      @onPageChange="onPage"
      @onDelete="onDeleteYes"
      @onUpdate="onUpdateClick"
      @selections="onHandleSelection"
      @onHandleSort="onHandleSort"
  >
    <template slot="columns">
      <Column field="name" header="Adı" sortable>
        <template #body="{ data }">
          {{ data.Employee.name ? data.Employee.name : '------' }}
        </template>
      </Column>
      <Column header="Talep Tarihi" sortable>
        <template #body="{ data }">
          {{ data.demandDate.split('T')[0] }}
        </template>
      </Column>
      <Column field="detail" header="Detay" sortable></Column>
      <Column field="reason" header="Sebeb" sortable></Column>
      <Column field="requestStatus" header="Durum" sortable></Column>

    </template>
    <template slot="action"></template>
  </j-table>

</template>

<script>
export default {
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

  methods: {
    onPage(params) {
      const {
        page: {page, rows: size}
      } = params

      this.$emit('onPageChange', {page, size})
    },

    onDeleteYes(id) {
      this.$emit('onDelete', id)
    },

    onUpdateClick(id) {
      this.$emit('onUpdate', id)
    },

    onHandleSelection(val) {
      this.$emit('onSelection', val)
    },

    onHandleSort(val) {
      this.$emit('onSort', val)
    }
  }
}
</script>

