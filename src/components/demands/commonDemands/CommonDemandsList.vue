<template>

  <j-table
      :value="data"
      :total="total"
      :loading="loading"
      :totalRecords="total"
      :lazy="true"
      :isMessage="true"
      sortMode="multiple"
      @onPageChange="onPage"
      @onDelete="onDeleteYes"
      @onUpdate="onUpdateClick"
      @onMessage="onMessageClick"
      @selections="onHandleSelection"
      @onHandleSort="onHandleSort"
  >
    <template slot="columns">
      <Column field="User.name" header="Adı" sortable></Column>
      <Column field="title" header="Başlık" sortable></Column>
      <Column field="description" header="Açıklama" sortable></Column>
      <Column header="Şikayet/Talep" sortable>
        <template #body="{ data }">
          {{ data.isDemand ? 'Talep' : 'Şikayet' }}
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

    onMessageClick(id) {
      this.$emit('onMessage', id)
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

