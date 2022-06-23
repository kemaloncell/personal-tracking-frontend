<template>
  <default-layout>
    <div slot="content">

      <i @click="goEmployee" class="pi pi-arrow-left font-bold mb-4" style="font-size: 1.3rem"></i>

      <div class="card">
        <TabView style="margin-left: 15rem; width: 70%">
          <TabPanel v-if="displayTab" :header="'Çalışan Ekle'">

            <CustomerForm
                :loading="submitLoading"
                :singleLoading="singleLoading"
                :defaultEmployee="employeeData"
                :type="EmployeeformType"
            />

          </TabPanel>
          <TabPanel v-if="displayTab" :header="'Hesap Oluştur'">
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
      employeeData: null,
      displayTab: true,
      EmployeeformType: null,
      formType: 'CREATE',
      defaultValues: null,
    }
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
    if (!this.$route.params.isShow) {
      this.EmployeeformType = this.$route.params.type
      this.$route.params.data != null ? this.employeeData = this.$route.params.data : this.employeeData = null
    } else {
      this.EmployeeformType = 'CREATE'
    }


  },

  created() {
    const userId = this.$route.params.id
    this.getAllEmployeeDocList(userId)
    this.getAllCategoryList()
    this.getAllDocTypeList()
  }
}
</script>