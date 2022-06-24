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
      <Column header="Adı" sortable>
        <template #body="{ data }">
          {{
            data.Employee.name ? data.Employee.name : '-'
          }}
        </template>
      </Column>
      <Column header="Başlangıç Tarihi" sortable>
        <template #body="{ data }">
          {{ data.beginDate.split('T')[0] }}
        </template>
      </Column>
      <Column header="Bitiş Tarihi" sortable>
        <template #body="{ data }">
          {{ data.endDate.split('T')[0] }}
        </template>
      </Column>
      <Column field="requestStatus" header="Durumu" sortable></Column>
      <Column field="offDayPeriod" header="İzin Aralığı" sortable></Column>
    </template>
    <template slot="action"></template>
  </j-table>

</template>

<script>
export default {

  props: {
    data: {
      type: Array,
      default: () => [],
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

