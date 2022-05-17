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
      <Column field="title" header="Hesap Adı" sortable></Column>
      <Column field="identityNumber" header="Kimlik No" sortable></Column>
      <Column header="Tüzel/Şahıs" sortable>
        <template #body="{ data }">
          {{ data.isCorporate ? `Tüzel` : `Şahıs` }}
        </template>
      </Column>
      <Column header="Vergi Dairesi" sortable>
        <template #body="{ data }">
          {{ data.TaxOffice.name }}
        </template>
      </Column>
    </template>
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
      console.log(id)
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

