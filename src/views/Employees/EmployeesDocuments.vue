<template>
  <default-layout>
    <div slot="content">
      <i @click="goEmployee" class="pi pi-arrow-left font-bold" style="font-size: 1.3rem"></i>
      <h2 class="text-center text-2xl font-medium ">Çalışan Dökümanları</h2>
      <div class="card">
        <TabView style="margin-left: 15rem; width: 70%">
          <TabPanel :header="'Çalışan Ekle'">

            <employee-form
                :loading="submitLoading"
                :singleLoading="singleLoading"
                :type="formType"
                :employeeDetailId="detailId"
                @onSubmit="accountSubmit"
                @close="closeModal"
            />

          </TabPanel>
          <TabPanel :header="'Hesap Oluştur'">

            <create-employee-form
                :loading="submitLoading"
                :singleLoading="singleLoading"
                :type="formType"
                :employeeDetailId="detailId"
                @onSubmit="accountSubmit"
                @close="closeModal"
            />

          </TabPanel>
          <TabPanel
              v-for="category in categoryList" :key="category.id" :header="category.name"
              v-if="filteredListData2 ? filteredListData2.id === category.id: true"
          >
            <employee-document-tab-page
                :category="category"
                :loading="submitLoading"
                :singleLoading="singleLoading"
                :defaultValues="defaultValues"
                :type="formType"
                @onSubmit="submit"

            />
          </TabPanel>

        </TabView>

      </div>

      <EmployeeDocumentList
          :data="employeeDocumentList"
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
import employeeDocumentMixins from "@/components/employees/mixins/employeeDocumentMixins";
import EmployeeDocumentList from "@/components/employees/EmployeeDocumentList";
import EmployeeDocumentTabPage from "@/components/employees/EmployeeDocumentTabPage";
import CreateEmployeeForm from "@/components/employees/CreateEmployeeForm";
import EmployeeForm from "@/components/employees/EmployeeForm";

export default {
  mixins: [employeeDocumentMixins],
  components: {
    EmployeeDocumentList,
    EmployeeDocumentTabPage,
    CreateEmployeeForm,
    EmployeeForm
  },
  data() {
    return {
      displayModal: false,
      formType: 'CREATE',
      defaultValues: null,
    }
  },

  computed: {
    filteredListData2() {
      return this.categoryList.find(item => {
        if (this.defaultValues != null) {
          return (item.id === this.defaultValues.EmployeeDocumentType.EmployeeDocumentCategory.id)
        }
      })
    },
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
        if (data.file) {
          this.fileSubmit(data, type)
        } else {
          await this.createSubmit(data, type)
        }
      }

      if (this.formType === 'UPDATE') {
        if (data.file) {
          this.fileSubmit(data)
        } else {
          await this.udpateSubmit(data)
        }
      }
    },

    goEmployee() {
      this.$router.push({name: 'Employee'})
    },
  },


  created() {
    const userId = this.$route.params.id
    this.getAllEmployeeDocList(userId)
    this.getAllCategoryList()
    this.getAllDocTypeList()
  }
}
</script>