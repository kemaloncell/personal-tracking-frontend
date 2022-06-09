<template>
  <default-layout>
    <div slot="content">

      <h2 class="text-center text-2xl font-medium mb-3">İzin / Talep</h2>

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

      <DemandsList
          :data="list"
          :loading="loading"
          @onUpdate="onUpdate"
          @onDelete="onDelete"
          @onSelection="onSelection"
      />
      <j-modal :visible.sync="displayModal" width="800px">
        <template slot="content">
          <OffDayDemandsForm
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
import offDayDemandsMixins from "@/components/demands/offDayDemands/mixins/offDayDemandsMixins";
import DemandsList from "@/components/demands/offDayDemands/DemandsList";
import OffDayDemandsForm from "@/components/demands/offDayDemands/OffDayDemandsForm";

export default {
  mixins: [offDayDemandsMixins],
  components: {
    DemandsList,
    OffDayDemandsForm
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
    this.getListCustomer()
  }
}
</script>
