<template>
  <div>
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
        @onMessage="onMessage"
        @selections="onHandleSelection"
        @onHandleSort="onHandleSort"
    >
      <template slot="columns">
        <Column field="title" header="Başlık" sortable></Column>
        <Column field="description" header="Açıklama" sortable></Column>
        <Column header="Şikayet/Talep" sortable>
          <template #body="{ data }">
            {{ data.isDemand ? 'Talep' : 'Şikayet' }}
          </template>
        </Column>
        <Column field="status" header="Durum" sortable></Column>

      </template>
      <template slot="action"></template>
    </j-table>

  </div>
</template>

<script>
import commonDemandsMessageMixins from './mixins/commonDemandsMessageMixins'
import GlobalForm from "@/components/globalMixins/globalForm";

export default {
  mixins: [commonDemandsMessageMixins, GlobalForm],


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
  },


}
</script>

