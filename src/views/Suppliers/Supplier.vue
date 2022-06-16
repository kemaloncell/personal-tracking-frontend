<template>
  <default-layout>
    <div slot="content">


      <h2 class="text-center text-2xl font-medium mb-3">Tedarikçiler</h2>

      <div
          class="flex mb-3 justify-content-between align-items-center mb-3 filters flex-wrap"
      >
        <div class="flex align-items-center">
          <Button @click="goCreatePage" class="commonDemandsServiceimary add-button"
          >Tedariçi Ekle
          </Button
          >
        </div>

      </div>

      <SupplierList
          :data="list"
          :loading="loading"
          @onUpdate="onUpdate"
          @onDelete="onDelete"
          @onSelection="onSelection"
      />

      <!--<j-modal :visible.sync="displayModal" width="800px">
        <template slot="content">
          <suppliers-form
              :loading="submitLoading"
              :singleLoading="singleLoading"
              :defaultValues="defaultValues"
              :type="formType"
              @onSubmit="submit"
              @close="closeModal"
          />
        </template>
      </j-modal> -->

      <Toast position="top-right"/>

    </div>
  </default-layout>
</template>


<script>

import SuppliersForm from "@/components/suppliers/SuppliersForm";
import SupplierList from "@/components/suppliers/SupplierList";
import supplierMixin from "@/components/suppliers/mixins/supplierMixins";

export default {
  mixins: [supplierMixin],
  components: {
    SuppliersForm,
    SupplierList,
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
    goCreatePage() {
      this.$router.push({name: 'SupplierDetail', params: {type: 'CREATE'}})
    },

    closeModal() {
      this.displayModal = false
      this.defaultValues = null
      this.formType = 'CREATE'

      this.resetForm()
    },

    /*async submit(data, type) {

      console.log(data, 'geldi')
      if (this.formType === 'CREATE') {
        console.log(data, type, 'gelid')
        this.createSubmit(data, type)
      }

      if (this.formType === 'UPDATE') {
        this.udpateSubmit(data)
      }
    }, */


  },
  created() {
    this.getListSupplier()
    console.log(this.defaultValues, 'defaultValues')
  }
}
</script>