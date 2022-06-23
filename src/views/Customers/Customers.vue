<template>
  <default-layout>
    <div slot="content">

      <h2 class="text-center text-2xl font-medium mb-3">Müşteriler</h2>

      <div
          class="flex mb-3 justify-content-between align-items-center mb-3 filters flex-wrap"
      >
        <div class="flex align-items-center">
          <Button @click="goCreatePage" class="p-button-primary add-button"
          >Müşteri Ekle
          </Button>

        </div>

      </div>

      <CustomerList
          :data="list"
          :loading="loading"
          @onUpdate="onUpdate"
          @onDelete="onDelete"
          @onSelection="onSelection"
      />

      <Toast position="top-right"/>
    </div>
  </default-layout>
</template>

<script>
import CustomerList from "@/components/customers/CustomerList";
import customerMixin from "@/components/customers/mixins/customerMixins";

export default {
  mixins: [customerMixin],
  components: {
    CustomerList,
  },
  data() {
    return {
      displayModal: false,
      updateId: null,
    }
  },

  methods: {
    goCreatePage() {
      this.$router.push({name: 'CustomerTabPage', params: {type: 'CREATE'}});
    },

    async onUpdate(val) {
      this.updateId = val.id
      const item = await this.getSingleCustomer(this.updateId)
      this.formData = item.data
      this.formData.taxOffice = item.data.TaxOffice
      await this.$router.push({name: 'CustomerTabPage', params: {id: val.id, data: item.data, type: 'UPDATE'}})
    },


  },
  created() {
    this.getListCustomer()
  }
}
</script>
