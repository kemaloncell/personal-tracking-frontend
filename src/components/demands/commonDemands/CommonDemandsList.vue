<template>
  <div>
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
        @onMessage="onMessage"
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

    <j-modal :visible.sync="displayModal" width="800px">
      <template slot="content">
        <commonDemandsMessageForm
            :loading="submitLoading"
            :singleLoading="singleLoading"
            :defaultValues="defaultValues"
            @onSubmit="commonMessageSubmit"
            @close="closeModal"
        />
      </template>
    </j-modal>

  </div>
</template>

<script>
import commonDemandsMessageMixins from './mixins/commonDemandsMessageMixins'
import GlobalForm from "@/components/globalMixins/globalForm";
import commonDemandsMessageForm from "./CommonDemandsMessageForm";

export default {
  mixins: [commonDemandsMessageMixins, GlobalForm],
  components: {
    commonDemandsMessageForm
  },
  data: () => ({
    displayModal: false,
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
    async commonMessageSubmit(data, type) {
      this.createSubmit(data, type)

    },

    async onMessage(val) {
      this.getListCommonDemandsMessage(val.id)
      this.formType = 'MESSAGE'
      this.displayModal = true
    },

    closeModal() {
      this.displayModal = false
      this.defaultValues = null
      this.formType = 'CREATE'

      // this.resetForm()
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

