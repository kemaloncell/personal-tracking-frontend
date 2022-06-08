<template>

  <j-table
      :value="data"
      :total="total"
      :loading="loading"
      :totalRecords="total"
      :lazy="true"
      :isVisibleUpdateButton="true"
      sortMode="multiple"
      @onPageChange="onPage"
      @onDelete="onDeleteYes"

  >
    <template slot="columns">
      <Column field="description" header="Mesaj"></Column>
      <Column header="İmage">
        asd
      </Column>

    </template>
    <template slot="action"></template>
  </j-table>

</template>

<script>

export default {
  mixins: ["commonDemandsMessageMixins"],
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

  },
}
</script>

