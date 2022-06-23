<template>
  <default-layout>
    <div slot="content">

      <i @click="goEmployee" class="pi pi-arrow-left font-bold mb-4" style="font-size: 1.3rem"></i>
      <p class="font-medium "> {{ getNameSurname }}</p>
      <div class="card">
        <TabView style="margin-left: 15rem; width: 70%">
          <TabPanel :header="tabName">

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
    tabName() {
      if (this.$route.params.type) {
        return this.$route.params.type === 'CREATE' ? 'Müşteri Oluştur' : 'Müşteri Düzenle';
      } else {
        return 'Müşteri Oluştur';
      }
    },
    getNameSurname() {
      console.log(this.$route.params, 'customerData')
      if (this.customerData != null) {
        return 'Seçilen müşteri:' + ' ' + this.customerData.title
      } else {
        return 'Müşteri Bilgileri'
      }

      if (this.$route.params != null) {
        return 'Seçilen müşteri:' + ' ' + this.$route.params.data.name
      } else {
        return 'Müşteri Bilgileri'
      }
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