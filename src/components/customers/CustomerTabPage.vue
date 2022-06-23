<template>
  <default-layout>
    <div slot="content">

      <i @click="goEmployee" class="pi pi-arrow-left font-bold mb-4" style="font-size: 1.3rem"></i>

      <div class="card">
        <TabView style="margin-left: 15rem; width: 70%">
          <TabPanel :header="TabName">

            <CustomerForm
                :loading="submitLoading"
                :singleLoading="singleLoading"
                :defaultCustomer="customerData"
                :type="customerFormType"
            />

          </TabPanel>
          <TabPanel :header="'Hesap Oluştur'">
            <CreateCustomerForm
                :loading="submitLoading"
                :singleLoading="singleLoading"
                :type="formType"
            />

          </TabPanel>

        </TabView>

      </div>

      <Toast position="top-right"/>

    </div>
  </default-layout>
</template>

<script>

import CustomerMixins from "@/components/customers/mixins/customerMixins";
import CustomerForm from "@/components/customers/CustomerForm";
import CreateCustomerForm from "@/components/customers/CreateCustomerForm";

export default {
  mixins: [CustomerMixins],
  components: {
    CustomerForm,
    CreateCustomerForm
  },
  data() {
    return {
      customerData: null,
      displayTab: true,
      formType: 'CREATE',
      customerFormType: null,
      defaultValues: null,
    }
  },

  computed: {
    TabName() {
      console.log(this.type, 'type')
      return this.type === 'CREATE' ? 'Hesap Oluştur' : 'Hesap Düzenle';
    },
  },

  methods: {

    async submit(data, type) {
      if (this.type === 'CREATE') {
        if (data.file) {
          this.fileSubmit(data, type)
        } else {
          await this.createSubmit(data, type)
        }
      }

      if (this.type === 'UPDATE') {
        if (data.file) {
          this.fileSubmit(data)
        } else {
          await this.udpateSubmit(data)
        }
      }
    },

    goEmployee() {
      this.$router.push({name: 'Customer'})
    },
  },
  mounted() {
    this.customerFormType = this.$route.params.type
    this.$route.params.data != null ? this.customerData = this.$route.params.data : this.customerData = null
  }
}
</script>