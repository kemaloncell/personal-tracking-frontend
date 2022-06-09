<template>
  <default-layout>
    <div slot="content">

      <h2 class="text-center text-2xl font-medium mb-3">Talepler</h2>

      <div
          class="flex mb-3 justify-content-between align-items-center mb-3 filters flex-wrap"
      >
        <div class="flex align-items-center">
          <Button @click="openModal" class="p-button-primary add-button"
          >İzin Ekle
          </Button
          >

        </div>

      </div>

      <AdvanceDemandsList
          :data="list"
          :loading="loading"
          @onUpdate="onUpdate"
          @onDelete="onDelete"
          @onSelection="onSelection"
      />
      <j-modal :visible.sync="displayModal" width="800px">
        <template slot="content">
          <AdvanceDemandsForm
              :loading="submitLoading"
              :singleLoading="singleLoading"
              :defaultValues="defaultValues"
              :type="formType"
              @onSubmit="submit"
              @close="closeModal"
          />
        </template>
      </j-modal>

      <Toast position="top-right"/>
    </div>
  </default-layout>
</template>

<script>
import AdvanceDemandsForm from "@/components/demands/advanceDemands/AdvanceDemandsForm";
import advanceDemandsMixins from "@/components/demands/advanceDemands/mixins/advanceDemandsMixins";
import AdvanceDemandsList from "@/components/demands/advanceDemands/AdvanceDemandsList";

export default {
  mixins: [advanceDemandsMixins],
  components: {
    AdvanceDemandsList,
    AdvanceDemandsForm
  },
  data() {
    return {
      displayModal: false,
      formType: 'CREATE',
      defaultValues: null,
      updateId: null,
    }
  },

  methods: {
    openModal() {
      this.displayModal = true;
    },

    closeModal() {
      this.displayModal = false
      this.defaultValues = null
      this.formType = 'CREATE'

      this.resetForm()
    },

    async submit(data, type) {
      if (this.formType === 'CREATE') {
        console.log(data, type, 'gelid')
        this.createSubmit(data, type)
      }

      if (this.formType === 'UPDATE') {
        this.udpateSubmit(data)
      }
    },


  },
  created() {
    this.getListAdvanceDemands()
  }
}
</script>
