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
      <Column field="name" header="Alan Adı" sortable></Column>
      <Column header="Şehir" sortable>
        <template #body="{ data }">
          {{ data.City.name ? data.City.name : '-' }}
        </template>
      </Column>
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

